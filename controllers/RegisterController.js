import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  // нормализуем входные данные
  const username = req.body.username.trim();
  const emailRaw = req.body.email.trim();

  const email = emailRaw.toLowerCase();
  const { password, phone, name } = req.body;

  try {
    // проверяем, нет ли пользователя с таким username ИЛИ email
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with this username or email already exists' });
    }

    const existingUsers = await User.countDocuments();
    const role = existingUsers === 0 ? 'admin' : 'user';

    // шифруем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,      
      phone,
      name,
      role,
      registered: new Date(),
    });

    await newUser.save();

    // создаём JWT
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '15m' },
    );

    res.json({
      message: 'User registered successfully',
      token,
      user: newUser,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};
