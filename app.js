const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
// const authJwt = require('./utils/jwt')
require('dotenv/config')

const app = express()

const port = process.env.PORT || 3550

// allow all config for cors
// app.use(cors())
// app.options('*', cors())

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )

    // Request headers you wish to allow
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    )

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
})

// routes
const userRoutes = require('./routes/users')
const requestRoutes = require('./routes/requests')
const realEstateRoutes = require('./routes/realEstate')
const referenceRoutes = require('./routes/references')
const contactRoutes = require('./routes/contacts')

// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

// authentication middleware to check token exists in API call
// app.use(authJwt)

// route middleware
app.use('/api/users', userRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/real-estate', realEstateRoutes)
app.use('/api/reference', referenceRoutes)
app.use('/api/contact', contactRoutes)

// connect to database
mongoose
    .connect(process.env.CONNECTION_STRING)
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
