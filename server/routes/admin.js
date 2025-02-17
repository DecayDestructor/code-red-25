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

module.exports = router
