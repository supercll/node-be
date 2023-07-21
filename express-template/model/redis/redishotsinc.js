const { redis } = require('./index')
exports.hotInc = async (videoId, incNum) => {
  // incNum热度权重
  let data = await redis.zscore('videohots', videoId)
  if (data) {
    let inc = await redis.zincrby('videohots', incNum, videoId)
  } else {
    let inc = await redis.zadd('videohots', incNum, videoId)
  }
  return
}

exports.topHots = async (num) => {
  let paixu = await redis.zrevrange('videohots', 0, -1, 'withscores')
  let newArr = paixu.slice(0, num * 2)
  let obj = {}
  for (let i = 0; i < newArr.length; i++){
    if(i%2 == 0){
      // 取键和值
      obj[newArr[i]] = newArr[i+1] 
    }
  }
  return obj 
}