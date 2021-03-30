const express = require('express')

const app = express()

app.use((req, res) => {
  res.json({
    headers: req.headers,
    originalUrl: req.originalUrl,
    body: req.body,
    method: req.method
  })
})

const port = process.env.PORT || 6000

app.listen(port, () => {
  console.log('App listening on port ' + port)
})
