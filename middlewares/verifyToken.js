// middlewares/verifyToken.js
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Нет токена' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded?.userId) {
      return res.status(403).json({ message: 'Неверный токен' });
    }

    req.userId = decoded.userId;
    next();
  });
};

export default verifyToken;
