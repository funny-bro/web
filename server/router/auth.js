var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.send('Birds home page')
})

router.post('/', function (req, res) {
  if(req.body.email !== process.env.AUTH_SIGN) return res.redirect('/erro')
  
  req.session.auth = req.body.email
  return res.redirect('/');
})

module.exports = router