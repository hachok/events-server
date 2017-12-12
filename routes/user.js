const express  = require('express');
const router = express.Router();
const User = require('../models/user');

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


router.get('/current-user', (req, res) => {
    User.findOne({_id: req.decoded.id}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            console.log(user, 'user');
            res.send({
                title: 'user',
                user: user
            });
        }
    });
});

module.exports = router;