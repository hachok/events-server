const express  = require('express');
const router = express.Router();
const Event = require('../models/event');

router.get('/', (req, res) => {
    Event.find({}, (err, events) => {
        if (err) {
            console.log(err);
        } else {
            res.send({
                title: 'events',
                events: events
            });
        }
    });
});

router.post('/', (req, res) => {
    Event.find({}, (err, events) => {
        if (err) {
            console.log(err);
        } else {
            res.send({
                title: 'events',
                events: events
            });
        }
    });
});

module.exports = router;