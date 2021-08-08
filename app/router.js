const Router = require('@koa/router')
const httpbinRouter = require('./routes/httpbin')
const echoRouter = require('./routes/echo')

const router = new Router()

router.use('/echo', echoRouter.routes(), echoRouter.allowedMethods())
router.use('/httpbin', httpbinRouter.routes(), httpbinRouter.allowedMethods())

router.get('/errors', async (ctx) => {
  await ctx.throw(403, 'Mock Forbidden Error', { code: 1001, expose: true })
  // console.log('hey?')
})

module.exports = router
