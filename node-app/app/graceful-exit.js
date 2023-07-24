const http = require('http')
const process = require('process')
const server = http
  .createServer(function (req, res) {
    setTimeout(function () {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('Hello World\\n')
    }, 4000)
  })
  .listen(9090, function (err) {
    console.log('listening <http://localhost:9090/>')
    console.log('pid is ', process.pid)
  })

process.on('SIGTERM', function() {
  server.close(function () {
    process.exit(0);
  })
})
