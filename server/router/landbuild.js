const express = require('express')
const router = express.Router()
const configParser = require('../../lib/systemConfig/parser')

const sequelize = require('../db/init')

router.get('/', async function (req, res) {
  try {
    const {updatedAt = '', cityCode = '', townCode = '', sectCode = ''} = req.query
    const [mm, dd, yy] = updatedAt.split('-')
    const _updatedAt = `${yy}-${mm}-${dd}`
    const sql = `
      SELECT * FROM  zd.landBuildRecords, zd.sections
      where zd.landBuildRecords.sectionId = zd.sections.id
      and zd.landBuildRecords.data  LIKE  '%＊%'
      and zd.sections.townCode = '${townCode}'
      and zd.sections.sectCode = '${sectCode}'
      and landBuildRecords.updatedAt >= '${_updatedAt}'
    `
    console.log('[INFO] sql: ', sql)
    const response = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT})

    for(let i=0 ;i<response.length; i++){
      const {cityCode, townCode, sectCode} = response[0]
      response[i].section = {
        cityCode: configParser.cityCode(cityCode).title,
        townCode: configParser.townCode(townCode).title,
        sectCode: configParser.sectCode(townCode, sectCode).title
      }
    }
    
    return res.json(response)
  }
  catch(err){
    return res.status(500).json(err.data)
  }
})

module.exports = router