const { Tracer, ConsoleRecorder } = require('zipkin')
const CLSContext = require('zipkin-context-cls')

const tracer = new Tracer({
  ctxImpl: new CLSContext('zipkin'),
  recorder: new ConsoleRecorder(),
  localServiceName: 'koa-demo'
})

module.exports = tracer
