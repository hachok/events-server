const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

router.post('/login', [
    check('email', 'Email is not correct').isEmail(),
    check('password', 'Password is required').exists()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ status: 401, message: 'Authentication failed. Bad credentials.' });
        } else if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.status(200).send({ token: token });
                } else {
                    res.status(401).json({ status: 401, message: 'Authentication failed. Bad credentials.' });
                }
            });
        }
    });
});

router.post('/registration', [
    check('email', 'Email   is not correct').isEmail(),
    check('password', 'Password is required').exists(),
    check('firstName', 'FirstName is required').exists(),
    check('lastName', 'LastName is required').exists()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.tags = req.body.tags;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) {
                console.log(err);
            }
            user.password = hash;
            user.save((err) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(400);
                } else {
                    res.sendStatus(200);
                }
            });
        })
    });
});

module.exports = router;