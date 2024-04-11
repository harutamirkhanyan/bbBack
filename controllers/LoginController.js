const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../utils/userUtils');

const login = (req, res) => {
  const { username, password } = req.body;
  
  const user = getUserByUsername(username);
  
  if (user && user.password === password) {
    // Create token
    const token = jwt.sign({ userId: user.id, username: user.username }, 'secret_key', { expiresIn: '15m' });
    res.json({ token, user });
  } else {
    res.status(401).json({ message: 'Wrong login or password' });
  }
};

module.exports = {
  login
}
