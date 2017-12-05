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
                    res.status(200).send({ user: user, _token: token });
                } else {
                    res.status(401).json({ status: 401, message: 'Authentication failed. Bad credentials.' });
                }
            });
        }
    });
});

router.get('/logout', (req, res) => {

});

module.exports = router;