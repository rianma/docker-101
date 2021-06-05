const Koa = require('koa')
const Router = require('@koa/router');
const morgan = require('koa-morgan')

const app = new Koa()

const router = new Router()

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

/**@param {import('koa').Context} ctx */
const forbiddenHandler = (ctx) => {
	ctx.status = 403
	ctx.body = 'Operation Is Not Allowed'
}
router.get('/status/403', forbiddenHandler)

/**@param {import('koa').Context} ctx */
const echoHander = (ctx) => {
	ctx.body = JSON.stringify({
		headers: ctx.req.headers,
		originalUrl: ctx.originalUrl,
		query: ctx.query,
		method: ctx.req.method
	})
}
router.get('/echo', echoHander)

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
