const Router = require('@koa/router')
const zipkinRouter = require('./components/zipkin/zipkin-router')
const router = new Router()

/** @param {import('koa').Context} ctx */
const forbiddenHandler = (ctx) => {
  ctx.status = 403
  ctx.body = 'Operation Is Not Allowed'
}
router.get('/status/403', forbiddenHandler)

/** @param {import('koa').Context} ctx */
const echoHandler = (ctx) => {
  ctx.body = JSON.stringify({
    headers: ctx.req.headers,
    originalUrl: ctx.originalUrl,
    query: ctx.query,
    method: ctx.req.method,
    body: ctx.request.body
  })
}
router.get('/echo', echoHandler)
router.post('/echo', echoHandler)

router.use('/zipkin', zipkinRouter.routes())
router.use('/zipkin', zipkinRouter.allowedMethods())

module.exports = router
