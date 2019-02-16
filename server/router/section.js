const express = require('express')
const router = express.Router()
const configParser = require('../../lib/systemConfig/parser')

const sequelize = require('../db/init')

router.get('/', async function (req, res) {
  try {
    const {cityCode, townCode, sectCode} = req.query
  
    if(!cityCode || !townCode || !sectCode) throw new Error(`Params cityCode, townCode, sectCode are required: ${cityCode, townCode, sectCode}`)
  
    const response = await sequelize.query(`SELECT * FROM zd.sections where cityCode='${cityCode}' and townCode='${townCode}' and sectCode='${sectCode}'`, { type: sequelize.QueryTypes.SELECT})
    const result = response[0] || {}
    return res.json(result)
  }
  catch(err){
    return res.status(500).json(err.data)
  }
})

module.exports = router