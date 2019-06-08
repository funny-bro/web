const express = require('express')
const router = express.Router()
const dao = require('../db/auth/dao')

router.get('/', async function (req, res) {
  try {
    const response = await dao.findAndCountAll()
    res.json(response)
  }
  catch(err){
    return res.status(500).json(err.data)
  }
})

router.post('/:id', async function (req, res) {
  try {
    const {id} = req.params
    const payload = req.body
    if(!id) throw new Error(`Params id are required: ${id}`)
  
    await dao.update(payload, {id})
    
    return res.json({})
  }
  catch(err){
    console.log(err)
    return res.status(500).json(err.data)
  }
})

module.exports = router