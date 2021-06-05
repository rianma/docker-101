const { Tracer, BatchRecorder, jsonEncoder } = require('zipkin')
const CLSContext = require('zipkin-context-cls')
const { HttpLogger } = require('zipkin-transport-http')
const wrapFetch = require('zipkin-instrumentation-fetch')
const fetch = require('node-fetch')

const tracer = new Tracer({
  ctxImpl: new CLSContext('zipkin'),
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: 'http://localhost:6000/zipkin',
      jsonEncoder: jsonEncoder.JSON_V2
    })
  }),
  localServiceName: 'zipkin-demo'
})

const remoteServiceName = 'httpbin'

const zipkinFetch = wrapFetch(fetch, {
  tracer,
  remoteServiceName
})

module.exports = zipkinFetch
