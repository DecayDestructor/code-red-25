const pool = require('../lib/db.js')
// import express
const express = require('express')
const app = express()
const redis = require('../lib/redis.js')

const router = express.Router()

router.get('/get-answer/warrior/:level', async (req, res) => {
  const { level } = req.params
  const redisKey = `warrior:level:${level}` // Unique Redis key

  try {
    // Check if data exists in Redis
    const cachedData = await redis.get(redisKey)
    if (cachedData) {
      console.log('Serving from Redis Cache')
      console.log(cachedData)

      return res.status(200).json(JSON.parse(cachedData))
    }

    // If not in Redis, fetch from PostgreSQL
    const getAnswerQuery = `SELECT * FROM warrior_level WHERE level = $1`
    const result = await pool.query(getAnswerQuery, [level])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Level not found' })
    }

    // Store result in Redis with 5-minute expiration (300 seconds)
    await redis.set(redisKey, JSON.stringify(result.rows), 'EX', 300)

    console.log('Serving from PostgreSQL & Caching in Redis')
    return res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching data:', error)
    return res.status(500).send('Server Error')
  }
})

router.get('/get-answer/wizard/:level', async (req, res) => {
  const { level } = req.params
  const redisKey = `wizard:level:${level}` // Unique Redis key for each level

  try {
    const cachedData = await redis.get(redisKey)
    const keys = await redis.keys('*')
    if (cachedData) {
      console.log('Serving from Redis Cache ')
      console.log(keys)

      return res.status(200).json(JSON.parse(cachedData)) // Return cached data
    }

    const getAnswerQuery = `SELECT * FROM wizard_level WHERE level = $1`
    const result = await pool.query(getAnswerQuery, [level])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Level not found' })
    }

    await redis.set(redisKey, JSON.stringify(result.rows), 'EX', 300)

    console.log('Serving from PostgreSQL & Caching in Redis ')
    return res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching data:', error)
    return res.status(500).send('Server Error')
  }
})

router.get('/check-answer/warrior/:level', async (req, res) => {
  const { level } = req.params
  const { answer, teamId } = req.body
  const redisKey = `warrior:level:${level}`
  const teamKey = `team:${teamId}`

  try {
    const cachedData = await redis.get(redisKey)

    if (cachedData) {
      console.log('Serving from Redis Cache')
      const result = JSON.parse(cachedData)
      console.log(result)

      const isCorrect = result.some(
        (row) => row.answer.toLowerCase() === answer.toLowerCase()
      )

      if (isCorrect) {
        await redis.hset(teamKey, 'warrior:level', level)
        console.log(await redis.hgetall(teamKey))
        return res.status(200).json({ correct: true })
      } else {
        return res.status(200).json({ correct: false })
      }
    }

    // If not cached, fetch from PostgreSQL
    console.log('Not in cache, fetching from PostgreSQL')
    const getAnswerQuery = `SELECT * FROM warrior_level WHERE level = $1`
    const result = await pool.query(getAnswerQuery, [level])
    console.log(result)

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Level not found' })
    }

    // Cache the retrieved answers in Redis with expiration
    await redis.set(redisKey, JSON.stringify(result.rows), 'EX', 300)

    // Check if the provided answer is correct
    const isCorrect = result.rows.some(
      (row) => row.answer.toLowerCase() === answer.toLowerCase()
    )

    if (isCorrect) {
      await redis.hset(teamKey, 'warrior:level', level)
      console.log(await redis.hgetall(teamKey))
      return res.status(200).json({ correct: true })
    } else {
      return res.status(200).json({ correct: false })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return res.status(500).send('Server Error')
  }
})

// route to check if an answer is correct

module.exports = router
