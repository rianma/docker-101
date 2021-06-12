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

/**
 * @param {import('koa').Context} ctx
 * @param {import('koa').Next} next
 */
app.use(async (ctx, next) => {
  console.log('#1 before-api-request')
  await next()
  console.log('#2 after-api-response')

  if (ctx.res.statusCode === 403) {
    ctx.body = 'Override Original Response Body'
  }

  console.log('#3 respones-body-after-override', ctx.body)
  console.log('#4 leave-pre-middleware')
})

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
