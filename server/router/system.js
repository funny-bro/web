const express = require('express')
const router = express.Router()
const config = require('../../lib/systemConfig')
const axios = require('axios')

router.get('/', async function (req, res) {
  const { townConfig, sectConfig, cityConfig} = config
  return res.json({ townConfig, sectConfig, cityConfig})
})

router.get('/calconfig', async function(req, res){
  console.log('process.env.CAL_CONFIG_URL: ', process.env.CAL_CONFIG_URL)
  const response = await axios.get(process.env.CAL_CONFIG_URL)
  return res.json(response.data)
})

module.exports = router