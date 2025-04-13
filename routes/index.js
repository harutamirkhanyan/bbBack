import express from 'express';
import commentsRouter from './comments.js';
import users from './users.js';
import rootRouter from './root.js';
import login from './login.js';
import register from './register.js';
import home from './home.js';
import verifyToken from './verifyToken.js';
import auth from './auth.js';

const router = express.Router();

router.use('/comments', commentsRouter);
router.use('/users', users);
router.use('/root', rootRouter);
router.use('/login', login);
router.use('/register', register);
router.use('/home', home);
router.use('/verify-token', verifyToken);
router.use('/auth', auth);

export default router;