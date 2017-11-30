const express  = require('express');
const router = express.Router();
const User = require('../models/user');
const { check, validationResult } = require('express-validator/check');

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
        } else {
            res.send({
                title: 'users',
                users: users
            });
        }
    });
});

router.post('/', [
    check('email').isEmail().withMessage('Email is not correct'),
    check('password').exists().withMessage('Password is required'),
    check('firstName').exists().withMessage('FirstName is required'),
    check('lastName').exists().withMessage('LastName is required'),
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

    user.save((err) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;