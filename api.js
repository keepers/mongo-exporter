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

app.get('/export/:key/:collection', auth, function(req, res, next) {
  mongoexport({
    key: 'lkm',
    collection: req.params.collection,
    fields: req.query.fields
  }, (a, b, c) => {
    return res.send({ a, b, c })
  })
})


app.get('/', (req, res) => res.send('mongo-exporter'))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Example app listening on port ${port}🚀`))