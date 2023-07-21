const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
  console.log('1 start')
  next()
  console.log('1 end')
})
app.use(async (ctx, next) => {
  await console.log('2 start')
  next()
  console.log('2 end')
})
app.use(async (ctx, next) => {
  await console.log('3 start')
  next()
  await console.log('3 end')
})
app.use(async (ctx, next) => {
  await console.log('4 start')
  await next()
  await console.log('4 end')
})


app.on('error',(err,ctx)=>{
  console.log(err);
  ctx.body = 'Server Err'+err
})

app.listen(3000,()=>{
  console.log('http://127.0.0.1:3000');
})