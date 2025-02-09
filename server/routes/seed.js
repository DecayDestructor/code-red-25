const pool = require('../lib/db.js')
// import express
const express = require('express')

const router = express.Router()

//create a get route to just log a hello to check the routes

router.get('/', async (req, res) => {
  console.log('Hello from the root route!')
  res.send('Hello')
})

// create a basic table with name and age and post query
//create a table

router.post('/tables', async (req, res) => {
  // Create a table using pool query
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS team (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255),
    wizard_level VARCHAR(255) NOT NULL,
    warrior_level VARCHAR(255) NOT NULL
  );`

  // const createWizardLevel = `
  // CREATE TABLE IF NOT EXISTS wizard_level(
  //   id SERIAL PRIMARY KEY,
  //   level VARCHAR(10),
  //   answer VARCHAR(255)
  // )
  // `
  // const createWarriorLevel = `
  // CREATE TABLE IF NOT EXISTS warrior_level(
  //   id SERIAL PRIMARY KEY,
  //   level VARCHAR(10),
  //   answer VARCHAR(255)
  // )
  // `

  try {
    const table = await pool.query(createTableQuery)
    // console.log(response)

    // const wizard_level = await pool.query(createWizardLevel)
    // const warrior_level = await pool.query(createWarriorLevel)
    // console.log(table, wizard_level, warrior_level)
    res.status(200).send('Table created successfully') // Send a success response.
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

//create similar route for warrior
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
