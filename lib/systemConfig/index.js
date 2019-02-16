const fs = require('fs')
const initTown = (_code) => {
  // const {code = '', title = ''} = cityConfig.find( item => item.code === _code) || {}
  // return {code, title}
  const basePath = `${__dirname}/../../configInit`
  const allFileList = fs.readdirSync(basePath)
  const townFileList = allFileList.filter(item => item.includes('town'))
  const returnData = []
  
  for(let i=0; i<townFileList.length;i++){
    const townList = require(`${basePath}/${townFileList[i]}`)
    returnData.push(...townList)
  }

  return returnData
}

const initSect = (_code) => {
  const basePath = `${__dirname}/../../configInit`
  const allFileList = fs.readdirSync(basePath)
  const sectFileList = allFileList.filter(item => item.includes('sect'))
  const returnData = []
  
  for(let i=0; i<sectFileList.length;i++){
    const fileName = sectFileList[i]
    const townCode = fileName.replace('.json', '').split('_')[2]
    const _townList = require(`${basePath}/${fileName}`)
    const townList = _townList.map( item => ({
      ...item,
      townCode
    }))
    returnData.push(...townList)
  }

  return returnData.map(item => {
    return {
      title: item.text,
      code: item.value,
      townCode: item.townCode
    }
  })
}

const townConfig = initTown()
const sectConfig = initSect()
const cityConfig = require('../../configInit/city.json')


module.exports = {
  townConfig,
  sectConfig,
  cityConfig,
}