const Router = require('@koa/router')
const httpbinRouter = require('./routes/httpbin')
const echoRouter = require('./routes/echo')

const router = new Router()

router.use('/echo', echoRouter.routes(), echoRouter.allowedMethods())
router.use('/httpbin', httpbinRouter.routes(), httpbinRouter.allowedMethods())

module.exports = router
