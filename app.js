const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const cors = require('cors')
// const authJwt = require('./utils/jwt')
require('dotenv/config')

const app = express()

const port = process.env.PORT || 3550

// routes
const userRoutes = require('./routes/users')
const requestRoutes = require('./routes/requests')
const realEstateRoutes = require('./routes/realEstate')
const referenceRoutes = require('./routes/references')
const contactRoutes = require('./routes/contacts')

// allow all config for cors
// var corsOptions = {
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
// }
// app.use(cors(corsOptions))
// app.options('*', cors())

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

// proxy setup
app.set('trust proxy', 1)

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
