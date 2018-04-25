const express = require('express')
const cors = require('cors')
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

app.use(cors())

app.get('/export/:key/:collection', auth, (req, res, next) => {
  const { collection, key } = req.params
  console.log(`Exporting collection ${collection} of ${key} db`)

  mongoexport({ key, collection, fields: req.query.fields }, (err, fileName) => {
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