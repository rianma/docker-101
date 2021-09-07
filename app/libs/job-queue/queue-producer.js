const { carOrderQueue } = require('./queue')
const uuid = require('uuid')
const logger = require('../logger')

const faker = require('faker')

const createCarOrder = () => {
  const customer = faker.name.firstName() + ' ' + faker.name.lastName()
  const product = faker.vehicle.vehicle()
  const color = faker.commerce.color()
  const purchaseAt = new Date()
  const country = faker.address.country()
  return {
    customer, product, color, purchaseAt, country, uuid: uuid.v4().replace(/-/g, '')
  }
}

let timer = null
let num = 0

const startProducer = (options) => {
  const { interval = 100, count = 100 } = options
  if (timer) {
    logger.warn('producer is already running')
    return
  }
  timer = setInterval(() => {
    if (num >= count) {
      stopProducer()
      return
    }
    const order = createCarOrder()
    carOrderQueue.add(order)
    num++
  }, interval)
}

const stopProducer = () => {
  if (!timer) {
    logger.warn('producer is not running')
    return
  }
  clearInterval(timer)
  num = 0
}

const addOneJob = async () => {
  const carOrder = createCarOrder()
  const job = carOrderQueue.add(carOrder)
  return job
}

module.exports = {
  init: startProducer,
  addOneJob,
  startProducer,
  stopProducer
}
