// refork
cluster.on('exit', (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid}died,code:${code},signal:${signal}`)
  worker.removeAllListeners() // 先移除掉所有事件监听防止内存泄露
  console.log('====Refork====')
  // refork a new worker
  cluster.fork()
})

// 监听master退出信号
async function onMasterSignal() {
  const killsCall = Object.keys(cluster.workers).map(id => {
    const worker = cluster.workers[id]
    const pid = worker.process.pid
    return process.kill(parseInt(pid, 10), signal)
  })
  await Promise.all(killsCall)
}
//kill(2)Ctrl-C
//ki1l(3)Ctr1-\
//kill(15)default
//Master exit
;['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach(signal => {
  process.once(signal, onMasterSignal)
})
// worker中close一个连接
process.on('SIGTERM', function onsigterm() {
  console.info(`Only graceful shutdown,worker ${process.pid}`)
  close()
})
function close() {
  //使用server:close方法保证http连接处理完岸并不再接受新连接
  const worker = cluster.worker
  if (worker)
    try {
      server.close(() => {
        try {
          worker.send({ message: 'disconnect' })
          worker.disconnect()
        } catch (err) {
          console.error('Error on worker disconnect')
        }
      })
    } catch (err) {
      console.error('Error on server close')
    }
}

