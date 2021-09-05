const logger = require('../libs/logger')

/**
 * @param {import('koa').Context} ctx
 * @param {import('koa').Next} next
 */
const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    // 有任何抛出来的异常，先在这里打印出来
    logger.error(err)

    const { status = 500, expose, message, code = -1, data = null } = err

    const msg = expose ? message : 'Internal Server Error'

    ctx.status = status
    ctx.type = 'json'
    ctx.body = {
      code,
      message: msg,
      data
    }
  }
}

module.exports = errorHandler
