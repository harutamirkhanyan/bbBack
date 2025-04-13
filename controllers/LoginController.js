import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Account is blocked' });
    }
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '15m' });
      user.lastLogin = new Date();
      await user.save();
      res.json({ token, user });
    } else {
      res.status(401).json({ message: 'Wrong login or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

