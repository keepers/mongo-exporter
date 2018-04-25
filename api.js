const express = require('express')
const jwt = require('express-jwt');

const app = express()

const config = require('./config')
const mongoexport = require('./mongoexport')

function auth (req, res, next) {
  if (!req.headers.authorization) { return next('UnauthorizedError') }

  const { secret } = config.databases[req.params.key]
  if (!secret) { return next('UnauthorizedError') }

  return jwt({ secret })(req, res, next)
}

app.get('/export/:key/:collection', auth, (req, res, next) => {
  console.log(`Exporting collection ${collection} of ${key} db`)

  mongoexport({
    key: req.params.key,
    collection: req.params.collection,
    fields: req.query.fields
  }, (err, fileName) => {
    if (err) {
      console.log(`Export failed: ${err}`)
      return next(err)
    }

    console.log(`Export completed succesfully at ${fileName}`)
    return res.sendFile(fileName)
  })
})

app.get('/', (req, res) => {
  console.log('Ping!')
  res.send('Pong!')
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Mongo Exporter listening on port ${port}🚀`))