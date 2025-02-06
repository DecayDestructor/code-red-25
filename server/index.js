const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const pool = require('./db.js')
const basic = require('./routes/seed.js')
const { Redis } = require('ioredis')
app.use(express.json())

app.use(cors())
app.use('/seed', basic)
const redis = new Redis(process.env.REDIS_URL)
// console.log(await pool.query('SELECT NOW()'))
redis.set('key', 'ioredis')

redis.get('key', function (err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
