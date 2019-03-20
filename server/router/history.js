const express = require('express')
const router = express.Router()
const historyDao = require('../db/history/dao')

router.get('/', async function (req, res) {
  const response = await historyDao.findAndCountAll({type: 'landBuildRecord'}, {limit: 999})
  return res.json([...response.data])
})

module.exports = router