const express = require('express')
const { Request } = require('../models/request')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const error = require('../utils/errorMessages')

const router = express.Router()

router.get('/', async (req, res) => {
    const requestList = Request.find()

    if (!requestList) {
        res.status(500).json(error.error500)
    }
    res.status(200).send(requestList)
})

module.exports = router
