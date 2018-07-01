const express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
let morgan = require('morgan')
let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('combined'))

app.use((req, res, next) => {
  res.send('Welcome to hour server')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on port 3000')
})
