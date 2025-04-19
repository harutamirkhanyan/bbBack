
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';


export const sendResetPasswordEmail = async (user, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  if (process.env.NODE_ENV !== 'production') {
    console.log(`📧  DEV‑режим: ссылка сброса для ${user.email}: ${resetUrl}`);
    return;
  }

  // ниже ‑ боевой SMTP
  const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
      user: process.env.MAILJET_API_KEY,
      pass: process.env.MAILJET_SECRET_KEY,
    },
  });

  await transporter.sendMail({
    from: '"MyApp" <no‑reply@myapp.com>',
    to: user.email,
    subject: 'Password reset',
    html: `<p>Сбросьте пароль по ссылке: <a href="${resetUrl}">${resetUrl}</a></p>`,
  });
};

// Обработчик запроса на сброс пароля
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    user.resetPasswordToken = token;
    await user.save();

    await sendResetPasswordEmail(user, token);
    res.json({ message: 'Password reset link sent to email' });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Error processing request', error });
  }
};

// Обработчик сброса пароля по токену
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (typeof token !== 'string') {
      return res.status(400).json({ message: 'Invalid token format' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId, resetPasswordToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
};
