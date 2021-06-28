const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')
const { koaMiddleware } = require('zipkin-instrumentation-koa')
const tracer = require('./libs/tracer')
const router = require('./router.js')

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = err.message
  }
})

app.use(morgan('combined'))

app.use(bodyParser())
app.use(koaMiddleware({ tracer }))

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
