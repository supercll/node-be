const http = require('http')

const router = require('./router')
const server = http.createServer()
server.listen(8081, function () {
  console.log('http://localhost:8081')
})

server.on('request', function (req, res) {
  console.log(req, res)
  router(req, res)
})
