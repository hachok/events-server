const express = require('express');
const router = express.Router();
const passport = require('passport');
const { check, validationResult } = require('express-validator/check');

router.post('/login', [
    check('email', 'Email is not correct').isEmail(),
    check('password', 'Password is required').exists()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    passport.authenticate('local')(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
});

module.exports = router;