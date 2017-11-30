const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const authRouter = require('./auth');

router.use('/users', userRouter);
router.post('/auth', authRouter);

module.exports = router;