const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/db');

const authRouter = require('./auth');
const usersRouter = require('./user');
const eventsRouter = require('./event');
const contactsRouter = require('./contacts');

router.use('/auth', authRouter);
router.use('/contacts', contactsRouter);

router.use((req, res, next) => {
    const token = req.body._token || req.query._token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({errors: [{status: 401, msg: 'Failed to authenticate token.' }]});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({errors: [{ status: 403, msg: 'Forbidden Error' }]})
    }
});

router.use('/users', usersRouter);
router.use('/events', eventsRouter);

module.exports = router;