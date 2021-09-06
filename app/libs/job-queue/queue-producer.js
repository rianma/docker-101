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

const startProducer = () => {
  if (timer) {
    logger.warn('producer is already running')
    return
  }
  timer = setInterval(() => {
    const order = createCarOrder()
    carOrderQueue.add(order)
  })
}

const stopProducer = () => {
  if (!timer) {
    logger.warn('producer is not running')
    return
  }
  clearInterval(timer)
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
