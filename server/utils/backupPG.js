const cron = require('node-cron')
const redis = require('../lib/redis.js')
const pool = require('../lib/db.js')

const backupDataToPostgres = async () => {
  try {
    const teamKeys = await redis.keys('team:*')

    for (const teamKey of teamKeys) {
      const teamData = await redis.hgetall(teamKey)

      if (!teamData) continue

      const teamId = teamKey.split(':')[1] // Extract team ID
      const warriorLevel = teamData['warrior:level'] || 0
      const wizardLevel = teamData['wizard:level'] || 0

      // Insert or update team progress in PostgreSQL
      await pool.query(
        `
        INSERT INTO team (id, warrior_level, wizard_level)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO UPDATE 
         SET warrior_level = EXCLUDED.warrior_level, wizard_level = EXCLUDED.wizard_level;,]`[
          (teamId, warriorLevel, wizardLevel)
        ]
      )
    }
  } catch (error) {}
}

const getDataFromPostgres = async () => {
  // const allKeys = await redis.keys('team:*')
  // console.log(allKeys)

  try {
    const query = `SELECT id, warrior_level, wizard_level FROM team`

    const redisDataExists = (await redis.keys('team:*')).length

    if (redisDataExists == 0) {
      const result = await pool.query(query)

      for (const row of result.rows) {
        const teamKey = `team:${row.id}`
        await redis.hset(teamKey, {
          'warrior:level': row.warrior_level,
          'wizard:level': row.wizard_level,
        })
      }
    }
  } catch (err) {}
}

getDataFromPostgres()
// Run backup job every 30 seconds
cron.schedule('*/7 * * * *', backupDataToPostgres)

// Run data fetch job every 30 seconds
cron.schedule('*/6 * * * *', getDataFromPostgres)
