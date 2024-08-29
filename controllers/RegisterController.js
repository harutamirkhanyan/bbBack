const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  const { username, password, email, phone, name } = req.body;

  try {
    // Проверяем, существует ли уже пользователь с таким же username или email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this username or email already exists' });
    }

    // Подсчет количества пользователей для назначения роли
    const existingUsers = await User.countDocuments();
    const role = existingUsers === 0 ? 'admin' : 'user';

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      phone,
      name,
      role,
      registered: new Date()
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, 'secret_key', { expiresIn: '15m' });

    res.json({
      message: 'User registered successfully',
      token,
      user: newUser
    });
  } catch (error) {
    console.error('Error registering user:', error); 
    res.status(500).json({ message: 'Error registering user' });
  }
};

module.exports = {
  register
};
