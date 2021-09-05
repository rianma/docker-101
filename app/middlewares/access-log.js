const logger = require('../libs/logger')

/**
 * @param {import('koa').Context} ctx
 * @param {import('koa').Next} next
 */
const accessLog = async (ctx, next) => {
  const reqline = `request: ${ctx.req.method} ${ctx.request.path}`
  logger.info(reqline)

  await next()
  const resline = `response: ${ctx.req.method} ${ctx.request.path} ${ctx.status} ${ctx.length}`
  logger.info(resline)
}

module.exports = accessLog
