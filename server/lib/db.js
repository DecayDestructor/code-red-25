const { Pool } = require('pg')
require('dotenv').config()
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
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
