const Router = require('@koa/router')
const httpbinRouter = require('./routes/httpbin')
const echoRouter = require('./routes/echo')
const spotifyRouter = require('./routes/spotify')

const router = new Router()

router.use('/echo', echoRouter.routes(), echoRouter.allowedMethods())
router.use('/httpbin', httpbinRouter.routes(), httpbinRouter.allowedMethods())
router.use('/spotify', spotifyRouter.routes(), spotifyRouter.allowedMethods())

module.exports = router
