const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/db');

const authRouter = require('./auth');
const usersRouter = require('./user');
const eventsRouter = require('./event');

router.use('/auth', authRouter);

router.use((req, res, next) => {
    const token = req.body._token || req.query._token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            status: 403,
            message: 'Forbidden Error'
        });
    }
});

router.use('/users', usersRouter);
router.use('/events', eventsRouter);

module.exports = router;