class MemoryLeakClass {
  constructor() {
    this.boom = new ArrayBuffer(100000)
  }
}

const unCollected = {}

setInterval(() => {
  unCollected[Date.now()] = new MemoryLeakClass()
}, 1000)