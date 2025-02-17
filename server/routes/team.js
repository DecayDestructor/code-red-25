const express = require('express')

const router = express.Router()
const pool = require('../lib/db.js')

router.post('/login', async (req, res) => {
  // console.log('hello world')

  const { id } = req.body
  const query = `
  SELECT * FROM team WHERE id = $1;
    `
  console.log(id)

  try {
    const result = await pool.query(query, [id])
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    res.json({
      message: 'Logged in successfully',
      id: result.rows[0].id,
      name: result.rows[0].name,
    })
  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ error: 'An error occurred while logging in' })
  }
})

module.exports = router
