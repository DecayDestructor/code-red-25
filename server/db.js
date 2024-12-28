const { Pool } = require('pg')
require('dotenv').config()
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
//check if connection is established
pool.query('SELECT 1', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack)
  } else {
    console.log('Connected to the PostgreSQL database.')
  }
})

// create a new user

module.exports = pool
