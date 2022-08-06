const express = require('express')
const { Contact } = require('../models/contact')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const error = require('../utils/errorMessages')

const router = express.Router()

router.get('/', async (req, res) => {
    const contactList = Contact.find()

    if (!contactList) {
        res.status(500).json(error.error500)
    }
    res.status(200).send(contactList)
})

router.post('/', async (req, res) => {
    let newContact = Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        location: req.body.location,
        message: req.body.message,
        contactMethod: req.body.contactMethod,
    })
    newContact = await newContact.save()

    if (!newContact) {
        return res.status(500).json(error.error500)
    }

    res.status(200).send(newContact)
})

module.exports = router
