const pool = require('../db.js')
// import express
const express = require('express')
const app = express()

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
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );`

  const createWizardTableQuery = `
  CREATE TABLE IF NOT EXISTS wizards (
    id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    levels INTEGER[],
    CONSTRAINT team_id_fk FOREIGN KEY (team_id) REFERENCES team (id) ON DELETE CASCADE
  );`

  const createWarriorTableQuery = `
  CREATE TABLE IF NOT EXISTS warriors (
    id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    levels INTEGER[],
    CONSTRAINT team_id_fk FOREIGN KEY (team_id) REFERENCES team (id) ON DELETE CASCADE
  );`

  const createWizardLevel = `
  CREATE TABLE IF NOT EXISTS wizard_level(
    id SERIAL PRIMARY KEY,
    level VARCHAR(10),
    answer VARCHAR(255)
  )
  `
  const createWarriorLevel = `
  CREATE TABLE IF NOT EXISTS warrior_level(
    id SERIAL PRIMARY KEY,
    level VARCHAR(10),
    answer VARCHAR(255)
  )
  `

  try {
    const table = await pool.query(createTableQuery)
    // console.log(response)
    const wizard = await pool.query(createWizardTableQuery)
    const warrior = await pool.query(createWarriorTableQuery)
    const wizard_level = await pool.query(createWizardLevel)
    const warrior_level = await pool.query(createWarriorLevel)
    console.log(table, warrior, wizard, wizard_level, warrior_level)
    res.status(200).send('Table created successfully') // Send a success response.
  } catch (err) {
    console.error(err.stack)
    res.status(500).send('An error occurred while creating the table')
  }
})

router.post('/leveltables', async (req, res) => {
  const { level } = req.body
})

//insert a user

router.post('/team', async (req, res) => {
  const { name, password } = req.body
  // insert into the three tables
  const insertTeamQuery = `
    INSERT INTO team (name, password)
    VALUES ($1, $2)
    RETURNING *;
  `

  // insert into wizard and warrior with foreign key
  const insertWizardQuery = `
   INSERT INTO wizards (team_id, levels)
   VALUES($1,$2)
   RETURNING *`

  const insertWarriorQuery = `
   INSERT INTO warriors (team_id, levels)
   VALUES($1,$2)
   RETURNING *`
  try {
    const team = await pool.query(insertTeamQuery, [name, password])
    const wizard = await pool.query(insertWizardQuery, [team.rows[0].id, []])
    const warrior = await pool.query(insertWarriorQuery, [team.rows[0].id, []])
    //return the inserted data
    res.status(200).send({
      team: team.rows[0],
      wizard: wizard.rows[0],
      warrior: warrior.rows[0],
    })
  } catch (err) {
    console.error(err.stack)
    res.status(500).send('An error occurred while inserting the user')
  }
})

module.exports = router
