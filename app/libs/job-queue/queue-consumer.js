const sleep = require('sleep-promise')
const util = require('util')
const { carOrderQueue } = require('./queue')
const logger = require('../logger')

const saveOrder = async (orderData) => {
  const { customer, product, color, purchaseAt, country, uuid } = orderData

  // Each one task takes 1 to 3 seconds
  const milliseconds = 1000 + Math.random() * 2000
  await sleep(milliseconds)
  logger.info('[new-order]', util.format('[uuid=%s] %s bought one %s car in %s color at %s in %s', uuid, customer, product, color, purchaseAt, country))
  return 0
}

/**
 * @param {object} options
 * @param {number} options.concurrency
 */
const init = (options) => {
  const { concurrency } = options

  carOrderQueue.process(concurrency, async (job) => {
    logger.debug('[processing-start]', job.id)
    const result = await saveOrder(job.data)
    logger.debug('[processing-end]', job.id)
    return result
  })

  carOrderQueue.on('stalled', (job) => {
    logger.error(util.format('[one-job-became-stalled] %j', job))
  })

  carOrderQueue.getFailed().then(failedJobs => {
    failedJobs.forEach(async (job) => {
      logger.debug(util.format('[retry-failed-job-start] %s %j', job.id, job))
      const result = await job.retry()
      logger.debug(util.format('[retry-failed-job-end] %s %j', job.id, result))
    })
  })

  logger.debug('[queue-consumer-inited]')
}

module.exports = {
  init
}
