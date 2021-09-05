const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
// const { koaMiddleware } = require('zipkin-instrumentation-koa')
// const tracer = require('./libs/tracer')
const router = require('./router.js')
const accessLog = require('./middlewares/access-log')
const errorHandler = require('./middlewares/error-handler')

const app = new Koa()

app.use(errorHandler)

app.use(accessLog)

app.use(bodyParser())
// app.use(koaMiddleware({ tracer }))

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
