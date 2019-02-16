const {
  townConfig,
  sectConfig,
  cityConfig,
} = require('./index')

const cityCode = (_code) => {
  const {code = '', title = ''} = cityConfig.find( item => item.code === _code) || {}
  return {code, title}
}

const townCode = (_code) => {
  const {code = '', title = ''} = townConfig.find( item => item.code === _code) || {}
  return {code, title}
}

const sectCode = (_townCode, _code) => {
  const {code = '', title = '', townCode = ''} = sectConfig.find( item => {
    return item.code === _code && item.townCode ===_townCode
  }) || {}
  return {code, title, townCode}
}

module.exports = {
  cityCode,
  townCode,
  sectCode
}