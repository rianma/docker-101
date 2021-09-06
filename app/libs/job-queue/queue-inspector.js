const { carOrderQueue } = require('./queue')
const logger = require('../logger')
const util = require('util')
const sleep = require('sleep-promise')

const formatJob = (job) => {
  const jobData = Object.entries(job.data).reduce((accu, [k, v]) => {
    return {
      ...accu,
      ['data.' + k]: v
    }
  }, {})
  return {
    id: job.id,
    finishedOn: (job.finishedOn && new Date(job.finishedOn).toISOString()) || null,
    processedOn: (job.processedOn && new Date(job.processedOn).toISOString()) || null,
    returnvalue: job.returnvalue,
    ...jobData
  }
}

const getAllJobs = async () => {
  const [
    delayedJobs,
    activeJobs,
    failedJobs,
    completedJobs,
    waitingJobs
  ] = await Promise.all([
    carOrderQueue.getDelayed(),
    carOrderQueue.getActive(),
    carOrderQueue.getFailed(),
    carOrderQueue.getCompleted(),
    carOrderQueue.getWaiting()
  ])

  return {
    delayedJobs,
    activeJobs,
    failedJobs,
    completedJobs,
    waitingJobs
  }
}

const printJobsToConsole = async () => {
  const { delayedJobs, activeJobs, failedJobs, completedJobs, waitingJobs } = await getAllJobs()

  logger.debug(util.format('[state=delayed] total: %s', delayedJobs.length))
  console.table(delayedJobs.map(formatJob))

  logger.debug(util.format('[state=active] total: %s', activeJobs.length))
  console.table(activeJobs.map(formatJob))

  logger.debug(util.format('[state=failed] total: %s', failedJobs.length))
  console.table(failedJobs.map((job) => {
    return { ...formatJob(job), failedReason: job.failedReason }
  }))

  logger.debug(util.format('[state=completed] total: %s (show only top 20s)', completedJobs.length))
  console.table(completedJobs.slice(0, 20).map((job) => {
    return {
      ...formatJob(job),
      duration: (job.finishedOn - job.processedOn) + 'ms'
    }
  }))

  logger.debug(util.format('[state=waiting] total: %s', waitingJobs.length))
  console.table(waitingJobs.map(formatJob))
}

const loop = async () => {
  await printJobsToConsole()
  await sleep(1000)
  process.stdout.write('\033c')
  await loop()
}

module.exports = {
  getAllJobs,
  printJobsToConsole,
  loop
}
