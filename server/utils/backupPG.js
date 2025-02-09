const cron = require('node-cron')
const redis = require('../lib/redis.js')
const pool = require('../lib/db.js')
const backupDataToPostgres = async () => {
  try {
    console.log('🔹 Running backup job...')

    // Get all team keys from Redis
    const teamKeys = await redis.keys('team:*')
    console.log(teamKeys)

    for (const teamKey of teamKeys) {
      const teamData = await redis.hgetall(teamKey)

      if (!teamData) continue

      const teamId = teamKey.split(':')[1] // Extract team ID
      const warriorLevel = teamData['warrior:level'] || 0
      const wizardLevel = teamData['wizard:level'] || 0

      // Insert or update team progress in PostgreSQL
      await pool.query(
        `INSERT INTO team (id, warrior_level, wizard_level)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO UPDATE 
         SET warrior_level = EXCLUDED.warrior_level, wizard_level = EXCLUDED.wizard_level;`,
        [teamId, warriorLevel, wizardLevel]
      )

      console.log(`✅ Backed up data for Team ${teamId}`)
    }
  } catch (error) {
    console.error('❌ Backup job failed:', error)
  }
}

cron.schedule('*/1 * * * *', backupDataToPostgres)

console.log('⏳ Cron job started. Running every 5 minutes...')
