const { init } = require('../app/libs/job-queue/queue-consumer')

init({ concurrency: 10 })
