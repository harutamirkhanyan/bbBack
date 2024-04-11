const jwt = require('jsonwebtoken');
const { addUser, getUserByUsername } = require('../utils/userUtils')




const register = ((req, res) => {
  const { username, password, email, phone, name } = req.body;

  // Проверка, что пользователь с таким именем пользователя уже не существует
  if (getUserByUsername(username)) {
    return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
  }

  // Добавление нового пользователя в базу данных
  const newUser = { username, password, email, phone,name };
  addUser(newUser);

  // Создание JWT токена для нового пользователя
  const token = jwt.sign({ username: newUser.username }, 'secret_key', { expiresIn: '15m' });
  res.json({ token });
})




module.exports = {
  register
}


