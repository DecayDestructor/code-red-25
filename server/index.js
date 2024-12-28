const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const pool = require('./db.js')
const basic = require('./routes/seed.js')
app.use(express.json())

app.use(cors())
app.use('/seed', basic)
// console.log(await pool.query('SELECT NOW()'))
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
