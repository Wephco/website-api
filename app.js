const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const authJwt = require('./utils/jwt')
require('dotenv/config')

const app = express()

const port = process.env.PORT || 3550

// routes
const userRoutes = require('./routes/users')
const requestRoutes = require('./routes/requests')

// allow all config for cors
app.use(cors())
app.options('*', cors())

// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

// authentication middleware to check token exists in API call
app.use(authJwt)

// route middleware
app.use('/api/users', userRoutes)
app.use('/api/requests', requestRoutes)

// connect to database
mongoose
    .connect(
        'mongodb://wephco-core:TFe808w1zPX4eIjjcHF9WKJyM7mXD2qADV5JDQhI07eBVEiLiZVEg7FVYwe0vmBfGVm0kosg0haDiGCMEQ2lww==@wephco-core.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@wephco-core@'
    )
    .then(() => {
        console.log('Database connection is ready')
    })
    .catch((err) => {
        console.log('Database connection failed')
        console.log(err)
    })

// start server
app.listen(port, () => {
    console.log('Server running')
})
