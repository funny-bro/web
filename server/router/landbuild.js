const express = require('express')
const router = express.Router()
const config = require('../lib/config')

const sequelize = require('../db/init')

router.get('/', async function (req, res) {
  const response = await sequelize.query(`SELECT * FROM zd.landBuildRecords where data  LIKE  '%＊%'`, { type: sequelize.QueryTypes.SELECT})

  for(let i=0 ;i<response.length; i++){
    const responseBuilding = await sequelize.query(`SELECT * FROM zd.sections where id = "${response[i].sectionId}"`, { type: sequelize.QueryTypes.SELECT})
    const {cityCode, townCode, sectCode} = responseBuilding[0]
    response[i].section = {
      ...responseBuilding[0],
      cityCode: config.cityCode(cityCode).title,
      townCode: config.townCode(townCode).title,
      sectCode: config.sectCode(townCode, sectCode).title
    }
  }
  
  return res.json(response)
})

module.exports = router