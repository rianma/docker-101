const fs = require('fs')
const path = require('path')
const util = require('util')
const crypto = require('crypto')

const Router = require('@koa/router')
const httpbinRouter = require('./routes/httpbin')
const echoRouter = require('./routes/echo')

const router = new Router()

router.use('/echo', echoRouter.routes(), echoRouter.allowedMethods())
router.use('/httpbin', httpbinRouter.routes(), httpbinRouter.allowedMethods())

const compare = (ifNoneMatch, freshMd5) => {
  if (!ifNoneMatch || !ifNoneMatch.startsWith('W/')) {
    return false
  }
  const clientMd5WithQuotes = ifNoneMatch.split('W/').pop()
  if (!clientMd5WithQuotes) return false
  const clientMd5 = clientMd5WithQuotes.replace(/"/g, '') || ''
  return clientMd5 === freshMd5
}

router.get('/page1', async (ctx) => {
  const file = path.join(__dirname, './static/page1.html')
  const body = await util.promisify(fs.readFile)(file)
  const freshMd5 = crypto.createHash('md5').update(body).digest('hex')
  const lastModified = new Date('2022-05-12 00:00:00').toUTCString()

  const ifNoneMatch = ctx.get('if-none-match')
  const notModified = compare(ifNoneMatch, freshMd5)
  ctx.set('Content-Type', 'text/html')

  if (notModified) {
    ctx.status = 304
    ctx.body = null
    ctx.set('ETag', ifNoneMatch)
  } else {
    ctx.status = 200
    ctx.body = body
    ctx.set('ETag', `W/"${freshMd5}"`)
    ctx.set('Last-Modified', lastModified)
    // ctx.set('Cache-Control', 'public, max-age=10')
  }
})

router.get('/errors', async (ctx) => {
  await ctx.throw(403, 'Mock Forbidden Error', { code: 1001, expose: true })
  // console.log('hey?')
})

module.exports = router
