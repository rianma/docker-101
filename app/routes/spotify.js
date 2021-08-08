const Router = require('@koa/router')
const querystring = require('querystring')
const { fetch: spotifyApiFetch } = require('../libs/spotify-api')

const router = new Router()

router.get('/search-track/:q', async (ctx) => {
  const { q } = ctx.params
  const result = await spotifyApiFetch({
    url: '/search?' + 
    querystring.stringify({
      q: q,
      type: "track",
      limit: 10
    })
  })
})

module.exports = router
