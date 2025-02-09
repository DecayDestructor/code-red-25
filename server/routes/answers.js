const pool = require('../lib/db.js')
// import express
const express = require('express')
const app = express()
const redis = require('../lib/redis.js')
const warriorAnswers = require('../data/warrior-answers.js')
const router = express.Router()

router.get('/get-answer/warrior/:level', async (req, res) => {
  const { level } = req.params
  const redisKey = `warrior:level:${level}` // Unique Redis key

  try {
    const cachedData = await redis.smembers(redisKey)
    if (cachedData) {
      console.log('Serving from Redis Cache')
      console.log(cachedData)

      return res.status(200).json(cachedData)
    }

    const getAnswerQuery = `SELECT * FROM warrior_level WHERE level = $1`
    const result = await pool.query(getAnswerQuery, [level])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Level not found' })
    }
    result.rows.forEach(async (row) => {
      await redis.sadd(redisKey, row.answer)
    })

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
    const ans = await redis.sismember(redisKey, answer)
    return res.status(200).json(Boolean(ans))
  } catch (err) {
    console.error(err.stack)
    return res.status(500).send('An error occurred while checking the answer')
  }
})

module.exports = router
