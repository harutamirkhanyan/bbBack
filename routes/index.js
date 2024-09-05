const express = require('express')
const commentsRouter = require('./comments')
const users = require('./users')
const rootRouter = require('./root')
const login = require('./login')
const register = require('./register')
const home = require('./home')
const authenticateToken = require('../utils/authMiddleware')
const verifyToken = require('./verifyToken')
const auth = require('./auth')

const router = express.Router()

// router.get('/verify-token', authenticateToken, (req, res) => {
//   // Если токен действителен, возвращаем данные пользователя
//   res.json({ user: req.user });
// });
router.use('/verify-token', authenticateToken, verifyToken)
router.use('/comments', authenticateToken, commentsRouter)
router.use('/users', authenticateToken, users)
router.use('/login', login)
router.use('/register', register)
router.use('/home', home)
router.use('/', auth);



router.use('/', rootRouter)

module.exports = router