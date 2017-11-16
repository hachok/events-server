const express  = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/users', (req, res) => {
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

router.post('/users', (req, res) => {
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