const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('./db');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    // Local Strategy
    passport.use(new LocalStrategy(function (username, password, done) {
        let query = {email: username};
        User.findOne(query, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false,  {message: 'Email is not exist'}); }
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Password is not correct'});
                }
            })
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};