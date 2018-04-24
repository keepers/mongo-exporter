const exec = require('child_process').exec
const config = require('./config')

function mongoexport({ key, collection, fields, type = 'csv', output = '' }, cb) {
  output || (output = `${collection}.${type}`)
  const { host, db, user, password } = config.databases[key]
  const command =  `mongoexport -h ${host} --db ${db}  -u ${user} -p ${password} --type=${type} --collection ${collection} --out ${output} --fields ${fields}`

  const child = exec(command, (err, stdout, stderr) => {
    console.log('stdout: ', stdout)
    console.log('stderr: ', stderr)

    if (err !== null) {
      console.log('exec error: ', err)
      return cb(err)
    }

    return cb(null, stdout, stderr)
  })
}


module.exports = mongoexport
