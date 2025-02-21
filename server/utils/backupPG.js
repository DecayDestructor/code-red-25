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
      const data = await pool.query(
        `
        INSERT INTO team (id, warrior_level, wizard_level)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO UPDATE 
         SET warrior_level = EXCLUDED.warrior_level, wizard_level = EXCLUDED.wizard_level RETURNING *;`,
        [teamId, warriorLevel, wizardLevel]
      )
      console.log('backed up to pg')
    }
  } catch (error) {
    console.error(error)
  }
}

const getDataFromPostgres = async () => {
  try {
    // Fetch existing keys in Redis
    const allKeys = await redis.keys('team:*')
    console.log('Existing Redis Keys:', allKeys)

    const query = `SELECT id, warrior_level, wizard_level FROM team`
    const result = await pool.query(query)

    const teamsInPostgres = result.rows.map((row) => row.id) // Extract team IDs from Postgres
    const redisTeamIds = allKeys.map((key) => key.split(':')[1]) // Extract IDs from Redis keys

    // Find missing teams in Redis
    const missingTeams = result.rows.filter(
      (row) => !redisTeamIds.includes(row.id.toString())
    )

    if (missingTeams.length === 0) {
      console.log('All teams are already in Redis.')
      return
    }

    console.log(
      `Adding missing teams:`,
      missingTeams.map((t) => t.id)
    )

    // Insert only missing teams into Redis
    const promises = missingTeams.map((row) =>
      redis.hset(
        `team:${row.id}`,
        'warrior:level',
        row.warrior_level,
        'wizard:level',
        row.wizard_level
      )
    )

    await Promise.all(promises)
    console.log('Missing teams added to Redis.')
  } catch (err) {
    console.error('Error fetching data from Postgres:', err)
  }
}

getDataFromPostgres()
// Run backup job every 30 seconds
cron.schedule('*/7 * * * *', backupDataToPostgres) // Runs every 7 minutes
cron.schedule('*/5 * * * *', getDataFromPostgres) // Runs every 5 minutes
