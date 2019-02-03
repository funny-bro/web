const config = require('../server/lib/config')

describe('config.cityCode', () => {
  test('should return A city config', () => {
    const result = config.cityCode('A')
    expect(result.code).toBe('A')
    expect(typeof result.title).toBe('string')
  })
})

describe('config.townCode', () => {
  test('should return H08 town config', () => {
    const result = config.townCode('H08')
    expect(result.code).toBe('H08')
    expect(result.title).toBe('八德區')
  })
})

describe('config.sectCode', () => {
  test('should return H08 town config', () => {
    const result = config.sectCode('A11', '0118')

    expect(result.code).toBe('0118')
    expect(result.title).toBe('公訓段二小段')
    expect(result.townCode).toBe('A11')
  })
})
