const exec = require('child_process').exec
const config = require('./config')

function mongodump({ key }, cb) {
  const { host, db, user, password } = config.databases[key]

  const command =  `mongodump -h ${host} --db ${db}  -u ${user} -p ${password}`
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


module.exports = mongodump


