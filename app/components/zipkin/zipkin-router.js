const Router = require('@koa/router')
const fetch = require('./zipkin-fetch')

const router = new Router()

router.post('/', async (ctx) => {
  const payload = ctx.request.body
  console.log('got-payload', JSON.stringify(payload))
  ctx.status = 202
  ctx.body = ''
})

router.get('/', async (ctx) => {
  const uuid = await fetch('https://httpbin.org/uuid')
    .then(res => res.ok && res.json())
    .then(json => {
      return json.uuid
    })
  ctx.body = {
    uuid
  }
})

module.exports = router
