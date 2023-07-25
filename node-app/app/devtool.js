class NodePerfClass {
  constructor() {}
}

class NodePerfNextClass {
  constructor() {
    this.pef = new NodePerfClass()
  }
}

const arr = new Array(100000).fill('').map(item => new NodePerfNextClass())