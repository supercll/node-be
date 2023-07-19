// 1: 导入http模块
const http = require('http')
const fs = require('fs')

// 2:创建服务器
// 获取到服务器的实例对象
const server = http.createServer()
server.listen(8081, function () {
  console.log('http://127.0.0.1:8081')
})

server.on('request', function (req, res) {
  // console.log('666');
  // // res.setHeader('Content-type','text/plain;charset=utf-8')
  // res.setHeader('Content-type','text/html;charset=utf-8')
  // // res.write('你好')
  // res.write('<h1>你好</h1>')
  // res.end()
  if (req.url == '/') {
    fs.readFile('./index.html', 'utf-8', function (err, data) {
      res.write(data)
      res.end()
    })
  } else {
    fs.readFile('./banner.png', function (err, data) {
      res.end(data)
    })
  }
})
