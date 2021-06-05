const app = require('./app/index.js')

const port = process.env.PORT || 6000

app.listen(port, () => {
  console.log('Process pid: ' + process.pid)
  console.log('App listening on port ' + port)
})
