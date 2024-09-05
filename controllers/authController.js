const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Функция отправки письма с ссылкой для сброса пароля через Mailjet
const sendResetPasswordEmail = async (user, token) => {
  const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
      user: 'c45f645dc72f64f84cd593f3da123c85', // Замените на ваш Mailjet API Key
      pass: '27953b06ceeb4db0a3d9b1beed929113' // Замените на ваш Mailjet Secret Key
    }
  });

  const resetUrl = `http://localhost:8080/reset-password/${token}`;

  await transporter.sendMail({
    from: 'a94harut@gmail.com',  // Замените на ваш email
    to: user.email,
    subject: 'Password Reset',
    html: `<p>To reset your password, click the following link: <a href="${resetUrl}">${resetUrl}</a></p>`
  });
};

// Обработчик запроса на сброс пароля
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

    // Сохранение токена в базе данных (или другой метод хранения)
    user.resetPasswordToken = token;
    await user.save();

    await sendResetPasswordEmail(user, token);
    res.json({ message: 'Password reset link sent to email' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Error processing request', error });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;  

  try {
    if (typeof token !== 'string') {
      return res.status(400).json({ message: 'Invalid token format' });
    }

    const decoded = jwt.verify(token, 'secret_key');
    const user = await User.findOne({ _id: decoded.userId, resetPasswordToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Хэшируем новый пароль
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Очистка токена
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
};


module.exports = {
  requestPasswordReset,
  resetPassword
};
