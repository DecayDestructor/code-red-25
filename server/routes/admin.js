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

module.exports = router
