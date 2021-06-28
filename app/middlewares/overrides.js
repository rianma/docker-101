/**
 * @param {import('koa').Context} ctx
 * @param {import('koa').Next} next
 */
const overrides = async (ctx, next) => {
  console.log('#1 before-api-request')
  await next()
  console.log('#2 after-api-response')

  if (ctx.res.statusCode === 403) {
    ctx.body = 'Override Original Response Body'
  }

  console.log('#3 respones-body-after-override', ctx.body)
  console.log('#4 leave-pre-middleware')
}

module.exports = overrides
