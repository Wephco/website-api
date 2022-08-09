const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
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
app.use(cors())
app.options('*', cors())
// app.use(
//     cors({
//         origin: ' https://wephco-staging-api.herokuapp.com',
//         credentials: true,
//     })
// )

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
//     )
//     next()
// })

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
