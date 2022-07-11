const express = require('express')
const { User } = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const error = require('../utils/errorMessages')

const router = express.Router()

router.get('/', async (req, res) => {
    const userList = User.find()

    if (!userList) {
        res.status(500).json(error.error500)
    }
    res.status(200).send(userList)
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash')

    if (!user) {
        res.status(404).json(error.error404)
    }
    res.status(200).send(user)
})

router.post('/register', async (req, res) => {
    let newUser = User({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.phone, 12),
    })
    newUser = await newUser.save()

    if (!newUser) {
        return res.status(500).json(error.error500)
    }

    res.status(200).send(newUser)
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = process.env.JWT_SECRET
    if (!user) {
        return res.status(400).send('Email/Password Incorrect')
    }

    // compare hashed password and password provided by user
    if (user && bcrypt.compareSync(req.body.phone, user.passwordHash)) {
        // create token
        const token = jwt.sign(
            {
                userId: user.id,
            },
            secret,
            {
                expiresIn: '1d',
            }
        )

        res.status(200).send({
            user: user.email,
            phone: user.phone,
            name: user.name,
            token: token,
        })
    } else {
        res.status(401).send('Email/Password Incorrect')
    }
})

module.exports = router
