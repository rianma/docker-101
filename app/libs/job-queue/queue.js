const Queue = require('bull')

const REDIS_HOST = process.env.REDIS_HOST || 'localhost'

const carOrderQueue = new Queue('car-order', `redis:${REDIS_HOST}:6379`)

module.exports = {
  carOrderQueue
}
