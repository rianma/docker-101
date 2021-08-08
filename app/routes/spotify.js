const Router = require('@koa/router')
const querystring = require('querystring')
const { spotifyApiFetch } = require('../libs/spotify-api')

const router = new Router()

router.get('/search-track/:q', async (ctx) => {
  const { q } = ctx.params
  try {
    const res = await spotifyApiFetch('/v1/search?' + querystring.stringify({ q, type: 'track', limit: 10 }))
    if (res.ok) {
      const json = await res.json()
      ctx.body = json
    } else {
      ctx.status = res.status
      ctx.body = await res.text()
    }
  } catch (e) {
    ctx.status = 500
    ctx.body = e.message
  }
})

module.exports = router
