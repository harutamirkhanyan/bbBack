const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      const token = jwt.sign({ userId: user._id, username: user.username }, 'secret_key', { expiresIn: '15m' });
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

module.exports = {
  login
};
