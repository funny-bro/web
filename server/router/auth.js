var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.send('Birds home page')
})

router.post('/', function (req, res) {
  const {email, password} = req.body
  const signedAuth = `${email}${password}`

  if(email !== process.env.AUTH_SIGN || password !== process.env.AUTH_SIGN_PWD) return res.redirect('/error')
  
  req.session.auth = signedAuth
  return res.redirect('/');
})

module.exports = router