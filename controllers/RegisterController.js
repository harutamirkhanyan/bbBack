const jwt = require('jsonwebtoken');
const User = require('../models/User');

// const register = async (req, res) => {
//   const { username, password, email, phone, name } = req.body;

//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
//     }

//     const newUser = new User({ username, password, email, phone, name });
//     await newUser.save();

//     const token = jwt.sign({ username: newUser.username }, 'secret_key', { expiresIn: '15m' });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// };

const register = async (req, res) => {
  const { username, password, email, phone, name } = req.body;

  try {
    const existingUsers = await User.countDocuments();
    const role = existingUsers === 0 ? 'admin' : 'user';
    
    const newUser = new User({ username, password, email, phone, name, role });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};


module.exports = {
  register
};
