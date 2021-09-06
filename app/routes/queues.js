const Router = require('@koa/router')
const { getAllJobs, printJobsToConsole } = require('../libs/job-queue/queue-inspector')
const { addOneJob } = require('../libs/job-queue/queue-producer')
const { init: initConsumer } = require('../libs/job-queue/queue-consumer')

const router = new Router()

router.get('/', async (ctx) => {
  const result = await getAllJobs()
  printJobsToConsole(result)
  ctx.status = 200
  ctx.body = {
    ...result,
    completedJobs: result.completedJobs.slice(0, 20)
  }
})

router.post('/', async (ctx) => {
  const result = await addOneJob()
  ctx.body = result
})

/**
 * FIXME: THIS IS BAD - ONLY FOR TESTING
 */
router.post('/init-consumer', async (ctx) => {
  initConsumer({ concurrency: 2 })
  ctx.body = 'OK'
})

module.exports = router
