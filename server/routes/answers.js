const pool = require('../lib/db.js')
// import express
const express = require('express')
const app = express()
const redis = require('../lib/redis.js')
const warriorAnswers = require('../data/warrior-answers.js')
const wizardAnswers = require('../data/wizard-answers.js')
const router = express.Router()

router.post('/check-answer/warrior/:level', async (req, res) => {
  // const dbSize=await redis.dbsize()
  const memoryInfo = await redis.info('memory')
  const usedMemoryMatch = memoryInfo.match(/used_memory:(\d+)/)

  // if (usedMemoryMatch) {
  //   const usedMemory = parseInt(usedMemoryMatch[1], 10)
  //   console.log(`Memory Usage: ${usedMemory / 1024} KB`)
  //   console.log(`Memory Usage: ${usedMemory / 1024 / 1024} MB`)
  // }
  const { level } = req.params
  const { answer, teamId } = req.body
  // const redisKey = `warrior:level:${level}`
  // console.log(level, teamId)

  const teamKey = `team:${teamId}`
  // console.log(warriorAnswers[`${level}`])
  if (!warriorAnswers[`${level}`]) {
    return res.status(404).json({ error: 'Level not found' })
  }
  const isCorrect = warriorAnswers[`${level}`].some(
    (row) => row.toLowerCase() === answer.toLowerCase()
  )
  if (isCorrect) {
    await redis.hset(teamKey, 'warrior:level', level)
    console.log(await redis.hgetall(teamKey))

    return res.status(200).json({ correct: true })
  }
  return res.status(200).json({ correct: false })
})
router.post('/check-answer/wizard/:level', async (req, res) => {
  const { level } = req.params
  const { answer, teamId } = req.body
  // console.log(answer)
  // const redisKey = `warrior:level:${level}`
  const teamKey = `team:${teamId}`
  // console.log(wizardAnswers)

  // console.log(wizardAnswers[`${level}`])
  if (!wizardAnswers[`${level}`]) {
    return res.status(404).json({ error: 'Level not found' })
  }
  // console.log(wizardAnswers[`${level}`], typeof answer)

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
