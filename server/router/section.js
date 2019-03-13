const express = require('express')
const router = express.Router()
const configParser = require('../../lib/systemConfig/parser')
const cityConfig = require('../../configInit/city.json')


const sequelize = require('../db/init')

router.get('/recentExcuted', async function (req, res) {
  try {

    const response = await sequelize.query(`select * from sections where executedAt is not null  ORDER BY executedAt DESC limit 10`)
    const result = response[0] || {}

    result.forEach(element => {
      let cityName = cityConfig.find(el => el.code === element.cityCode).title

      let townConfig = require(`../../configInit/town_${element.cityCode}.json`)
      let townName = townConfig.find(el => el.code === element.townCode).title

      let sectConfig = require(`../../configInit/section_${element.cityCode}_${element.townCode}.json`)
      let sectName = sectConfig.find(el => el.value === element.sectCode).text

      element.cityName =  cityName
      element.townName =  townName
      element.sectName =  sectName
    });

    return res.json(result)
  }
  catch(err){
    console.log('err',err)
    return res.status(500).json(err.data)
  }
})

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


router.post('/', async function (req, res) {

  try {
    const {id, landBuildMax} = req.body
    if(!id || !landBuildMax) throw new Error(`Params landBuildMax, id are required: ${id, landBuildMax}`)
  
    const response = await sequelize.query(`UPDATE sections SET landBuildMax = '${landBuildMax}' WHERE id = '${id}'`)

    return res.json({})
  }
  catch(err){
    console.log(err)
    return res.status(500).json(err.data)
  }
})

module.exports = router