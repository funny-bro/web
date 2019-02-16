const express = require('express')
const router = express.Router()
const config = require('../../lib/systemConfig')

router.get('/', async function (req, res) {
  const { townConfig, sectConfig, cityConfig} = config
  return res.json({ townConfig, sectConfig, cityConfig})
})

module.exports = router