const Router = require('@koa/router')

const router = new Router()

router.post('/', async (ctx) => {
  const payload = ctx.request.body
  console.log('got-payload', JSON.stringify(payload))
  ctx.status = 202
  ctx.body = ''
})

module.exports = router
