const pool = require('../lib/db.js')
// import express
const express = require('express')
const app = express()
const redis = require('../lib/redis.js')

const router = express.Router()

router.get('/get-answer/warrior/:level', async (req, res) => {
  const { level } = req.params
  const redisKey = `warrior:level:${level}` // Unique Redis key for each level

  try {
    const cachedData = await redis.get(redisKey)
    const keys = await redis.keys('*')
    if (cachedData) {
      console.log('Serving from Redis Cache ')
      console.log(keys)

      return res.status(200).json(JSON.parse(cachedData)) // Return cached data
    }

    const getAnswerQuery = `SELECT * FROM warrior_level WHERE level = $1`
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

// route to check if an answer is correct

module.exports = router
