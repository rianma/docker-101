const wrapFetch = require('zipkin-instrumentation-fetch')
const fetch = require('node-fetch')
const tracer = require('./tracer')

const createFetch = (remoteServiceName) => {
  return wrapFetch(fetch, {
    tracer,
    remoteServiceName
  })
}

const defaultFetch = createFetch('default')

module.exports = {
  createFetch,
  defaultFetch
}
