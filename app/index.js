const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')
const router = require('./router.js')

const app = new Koa()

app.use(bodyParser())
app.use(morgan('combined'))

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
