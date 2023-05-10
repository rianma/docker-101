const Router = require('@koa/router')

const router = new Router()

router.all(':rest(.*)', async (ctx) => {
  const { headers, originalUrl, method, body } = ctx.request
  const { rest: relativePath } = ctx.params

  ctx.cookies.set('key1', 'val1', { path: '/echo/' })

  ctx.body = JSON.stringify({
    headers,
    originalUrl,
    query: ctx.query,
    method: ctx.req.method,
    body: ctx.request.body,
    relativePath
  })
})

module.exports = router
