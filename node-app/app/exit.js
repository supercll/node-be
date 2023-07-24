const main = async () => {
  const command = iswin
    ? 'wmic Path win32_process Where "Name =\'node.exe\'"Get CommandLine,ProcessId'
    : 'ps -eo "pid,args" | grep node'
}
main().then(result => {
  result.forEach(item => {
    process.kill(item.pid, 'SIGTERM')
  })
})
