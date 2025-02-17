const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const pool = require('./lib/db.js')
const basic = require('./routes/seed.js')
const answers = require('./routes/answers.js')
const teamRouter = require('./routes/team.js')
const adminRouter = require('./routes/admin.js')
const { Redis } = require('ioredis')
const backupToPostgress = require('./utils/backupPG.js')
app.use(express.json())
const redis = require('./lib/redis.js')
app.use(cors())
app.use('/seed', basic)
app.use('/answers', answers)
app.use('/team', teamRouter)
app.use('/admin', adminRouter)
// const redis = new Redis(process.env.REDIS_URL)
// console.log(await pool.query('SELECT NOW()'))
redis.set('key', 'ioredis')

redis.get('key', function (err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
})
