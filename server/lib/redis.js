const { Redis } = require('ioredis')
require('dotenv').config()
const getRedisURL = () => {
  if (process.env.REDIS_URL) {
    // console.log(process.env.REDIS_URL)

    return process.env.REDIS_URL
  }
  throw new Error('Redis URL not configured')
}

const redis = new Redis(getRedisURL())
module.exports = redis
