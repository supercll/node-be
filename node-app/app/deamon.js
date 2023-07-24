const { spawn } = require('child_process')
const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true, // 可以让子进程在父进程退出后继续运行
  stdio: 'ignore',
})
subprocess.unref()
