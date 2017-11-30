const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
});