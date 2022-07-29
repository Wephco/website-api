const express = require('express')
const { Reference } = require('../models/reference')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const error = require('../utils/errorMessages')

const router = express.Router()

router.get('/', async (req, res) => {
    const requestList = Request.find()

    if (!requestList) {
        res.status(500).json(error.error500)
    }
    res.status(200).send(requestList)
})

router.post('/', async (req, res) => {
    let newReference = Reference({
        reference: req.body.reference ? req.body.reference : new Date.now(),
        notes: req.body.notes ? req.body.notes : '',
    })

    newReference = newReference.save()

    if (!newReference) {
        return res.status(500).json(error.error500)
    }

    res.status(200).send()
})

module.exports = router
