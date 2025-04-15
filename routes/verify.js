import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/verify-token', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при проверке токена' });
  }
});

export default router;
