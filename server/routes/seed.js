const pool = require('../lib/db.js')
// import express
const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
  console.log('Hello from the root route!')
  res.send('Hello')
})

router.post('/tables', async (req, res) => {
  // Create a table using pool query
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS team (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255),
    wizard_level VARCHAR(255) NOT NULL,
    warrior_level VARCHAR(255) NOT NULL
  );`

  try {
    const table = await pool.query(createTableQuery)
    res.status(200).send('Table created successfully')
  } catch (err) {
    console.error(err.stack)
    res.status(500).send('An error occurred while creating the table')
  }
})

//insert a user

router.post('/team', async (req, res) => {
  const { name } = req.body
  // insert into the three tables
  const insertTeamQuery = `
    INSERT INTO team (name, wizard_level, warrior_level)
    VALUES ($1, $2, $3)
    RETURNING *;
  `
  try {
    const team = await pool.query(insertTeamQuery, [name, 0, 0])
    //return the inserted data
    res.status(200).send({
      team: team.rows[0],
    })
  } catch (err) {
    console.error(err.stack)
    res.status(500).send('An error occurred while inserting the user')
  }
})

router.post('/insert-answer/wizard/:level', async (req, res) => {
  const { answer } = req.body
  const { level } = req.params
  const insertAnswerQuery = `
    INSERT INTO wizard_level (level, answer)
    VALUES ($1, $2)
    RETURNING *;
  `
  try {
    const result = await pool.query(insertAnswerQuery, [level, answer])
    res.status(200).send(result.rows[0])
  } catch (err) {
    console.error(err.stack)
    res.status(500).send('An error occurred while inserting the answer')
  }
})

router.post('/insert-answer/warrior/:level', async (req, res) => {
  const { answer } = req.body
  const { level } = req.params
  const insertAnswerQuery = `
    INSERT INTO warrior_level (level, answer)
    VALUES ($1, $2)
    RETURNING *;
  `
  try {
    const result = await pool.query(insertAnswerQuery, [level, answer])
    res.status(200).send(result.rows[0])
  } catch (err) {
    console.error(err.stack)
    res.status(500).send('An error occurred while inserting the answer')
  }
})

module.exports = router
