const express  = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
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
    check('email', 'Email is not correct').isEmail(),
    check('password', 'Password is required').exists(),
    check('firstName', 'FirstName is required').exists(),
    check('lastName', 'LastName is required').exists(),
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