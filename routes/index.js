const express = require('express')
const commentsRouter = require('./comments')
const userRouter = require('./users')
const rootRouter = require('./root')
const login = require('./login')
const register = require('./register')
const home = require('./home')
const authenticateToken = require('../utils/authMiddleware')


const router = express.Router()

router.use('/comments', authenticateToken, commentsRouter)
router.use('/user',authenticateToken, userRouter)
router.use('/login', login)
router.use('/register', register)
router.use('/home', home)

router.use('/', rootRouter)

module.exports = router