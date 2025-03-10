const pool = require('../lib/db.js')
// import express
const express = require('express')
const app = express()
const redis = require('../lib/redis.js')
const warriorAnswers = require('../data/warrior-answers.js')
const wizardAnswers = require('../data/wizard-answers.js')
const router = express.Router()

//route to get all teams and their status

router.get('/teams', async (req, res) => {
  try {
    const teams = await redis.keys('team:*') // Get all team keys
    const teamData = []
    if (!teams.length) return res.json([]) // Return empty array if no teams found

    for (const teamKey of teams) {
      const teamInfo = await redis.hgetall(teamKey) // Fetch team data from Redis
      teamData.push({
        id: teamKey.split(':')[1], // Extract teamId from key
        warriorLevel: teamInfo['warrior:level'] || 'N/A', // Default to 'N/A' if not set
        wizardLevel: teamInfo['wizard:level'] || 'N/A',
      })
    }

    res.json(teamData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching team data' })
  }
})

//route to get all teams and their status from postgres

router.get('/teams/postgres', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM team')
    client.release()

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching team data from postgres' })
  }
})
//route to clear all redis keys

router.delete('/clear-redis', async (req, res) => {
  try {
    const teams = await redis.keys('team:*') // Get all team keys

    for (const teamKey of teams) {
      await redis.del(teamKey) // Delete team data from Redis
    }

    res.json({ message: 'All Redis keys deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error deleting Redis keys' })
  }
})
//route to truncate all postgres teams

router.delete('/clear-postgres', async (req, res) => {
  try {
    const client = await pool.connect()
    await client.query('TRUNCATE TABLE team')
    client.release()

    res.json({ message: 'All PostgreSQL teams truncated successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error truncating PostgreSQL teams' })
  }
})
//see all tables in postgres

router.get('/tables', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    )
    client.release()

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching table names' })
  }
})
router.get('/redis-memory', async (req, res) => {
  try {
    const info = await redis.info('memory') // Get memory info
    const usedMemory = info.match(/used_memory:(\d+)/)[1] // Extract used memory in bytes

    const usedMemoryKB = (usedMemory / 1024).toFixed(2) // Convert to KB
    const usedMemoryMB = (usedMemory / (1024 * 1024)).toFixed(2) // Convert to MB

    res.json({
      usedMemoryBytes: usedMemory,
      usedMemoryKB,
      usedMemoryMB,
    })
  } catch (error) {
    console.error('Error fetching Redis memory usage:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
