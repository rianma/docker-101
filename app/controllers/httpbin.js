const Router = require('@koa/router')
const { createFetch } = require('../libs/fetch')

const router = new Router()
const fetch = createFetch('httpbin')

router.all(':path(.*)', async (ctx) => {
  const { headers, originalUrl, method, body } = ctx.request
  const parts = originalUrl.split('/httpbin')
  const proxyToPath = parts.length > 1 ? parts[0] + parts[1] : '/'
  const requestOptions = {
    url: 'https://httpbin.org' + proxyToPath,
    method,
    headers,
    ...(['GET', 'HEAD'].includes(method) ? {} : { body })
  }
  try {
    const rawResponse = await fetch(requestOptions)
    ctx.status = rawResponse.status
    ctx.body = rawResponse.body
    for (const pair of rawResponse.headers) {
      const [k, v] = pair
      ctx.set(k, v)
    }
  } catch (error) {
    ctx.status = 500
    ctx.body = error.message
  }
})

module.exports = router
