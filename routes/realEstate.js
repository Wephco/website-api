const express = require('express')
const { RealEstateRequest } = require('../models/realEstateRequest')
const { Request } = require('../models/request')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const error = require('../utils/errorMessages')

const router = express.Router()

router.get('/', async (req, res) => {
    const requestList = RealEstateRequest.find()

    if (!requestList) {
        res.status(500).json(error.error500)
    }
    res.status(200).send(requestList)
})

router.post('/new-request', async (req, res) => {
    let newRealEstateRequest = new RealEstateRequest({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        location: req.body.location,
        property: req.body.property,
        bedroom: req.body.bedroom,
        budget: req.body.budget,
    })

    newRealEstateRequest = await newRealEstateRequest.save()

    if (!newRealEstateRequest) {
        return res.status(500).json(error.error500)
    }

    res.status(200).send(newRealEstateRequest)
})

module.exports = router
