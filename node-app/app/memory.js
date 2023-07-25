const format = (bytes) => {
  return (bytes / 1024 / 1024).toFixed(2) + 'MB'
}

const print = () => {
  const memoryUsage = process.memoryUsage()

  console.log(JSON.stringify({
    rss: format(memoryUsage.rss), // Resident Set Size 进程执行分配的总内存
    heapTotal: format(memoryUsage.heapTotal), // V8分配的堆总大小
    heapUsed: format(memoryUsage.heapUsed), // V8执行期间实际使用的内存
    external: format(memoryUsage.external), // external进程使用的一些c库占用
  }));
}

function Quantity(num) {
  if (num) {
    return new Array(num * 1024 * 1024)
  }
  return num
}

function Fruit(name, quantity) {
  this.name = name
  this.quantity = new Quantity(quantity)
}

let apple = new Fruit('apple')
print()
let banana = new Fruit('banana', 20)
print()
banana = null // 清掉对象
print()
global.gc() // 手动执行gc
print()