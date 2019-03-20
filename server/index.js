const express = require('express')
const bodyParser = require('body-parser')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }


  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json());
  app.use( require('cookie-session')({
    name: 'session',
    keys: ['key1'/* secret keys */],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

  app.use('/api/auth/', require('./router/auth'))
  app.use('/api/landbuilds/', require('./router/landbuild'))
  app.use('/api/system/', require('./router/system'))
  app.use('/api/section/', require('./router/section'))
  app.use('/api/history/', require('./router/history'))

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
