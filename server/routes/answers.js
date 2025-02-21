const pool = require('../lib/db.js')
// import express
const express = require('express')
const app = express()
const redis = require('../lib/redis.js')
const warriorAnswers = require('../data/warrior-answers.js')
const wizardAnswers = require('../data/wizard-answers.js')
const router = express.Router()

router.post('/check-answer/warrior/:level', async (req, res) => {
  const { level } = req.params
  const { answer, teamId } = req.body

  const teamKey = `team:${teamId}`
  if (!warriorAnswers[`${level}`]) {
    return res.status(404).json({ error: 'Level not found' })
  }
  const isCorrect = warriorAnswers[`${level}`].some(
    (row) => row.toLowerCase() === answer.toLowerCase()
  )
  if (isCorrect) {
    console.log(`Team ${teamId} passed warrior level ${level} correctly`)
    await redis.hset(teamKey, 'warrior:level', level)
    console.log(await redis.hgetall(teamKey))

    return res.status(200).json({ correct: true })
  }
  return res.status(200).json({ correct: false })
})
router.post('/check-answer/wizard/:level', async (req, res) => {
  console.log(`Team ${teamId} passed warrior level ${level} correctly`)
  const { level } = req.params
  const { answer, teamId } = req.body
  const teamKey = `team:${teamId}`
  if (!wizardAnswers[`${level}`]) {
    return res.status(404).json({ error: 'Level not found' })
  }

  const isCorrect = wizardAnswers[`${level}`].some(
    (row) => row.toLowerCase() === answer.toLowerCase()
  )
  if (isCorrect) {
    await redis.hset(teamKey, 'wizard:level', level)
    console.log(await redis.hgetall(teamKey))

    return res.status(200).json({ correct: true })
  }
  return res.status(200).json({ correct: false })
})

module.exports = router
