
const producer = require('../app/libs/job-queue/queue-producer')

producer.startProducer({
  interval: 100,
  count: 100
})
