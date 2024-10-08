const User = require('../models/User');

const getSingleUserHandler = async (req, res) => {
  const { username } = req.query; 1
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user' });
  }
};

const getAllUserList = async (req, res) => {
  try {
    const userList = await User.find()
    res.json(userList)
  } catch (error) {
    res.status(500).json({ message: 'Error during get userlist' })
  }

}



const addUsersHandler = async (req, res) => {
  const { username, password, email, phone, name } = req.body;

  const newUser = new User({ username, password, email, phone, name });

  try {
    await newUser.save();
    res.json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user' });
  }
};

const editUser = async (req, res) => {
  const { currentUsername, data } = req.body;

  try {
    const user = await User.findOneAndUpdate({ username: currentUsername }, data, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

const blockUsers = async (req, res) => {
  try {
    const { userIds } = req.body; // Извлечение массива идентификаторов пользователей из тела запроса

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'Invalid input. userIds should be a non-empty array.' });
    }

    // Обновление всех пользователей с указанными идентификаторами
    const result = await User.updateMany(
      { _id: { $in: userIds } }, // Условие поиска пользователей по идентификаторам
      { isBlocked: true } // Обновление поля isBlocked
    );


    // Проверка, были ли обновлены пользователи
    if (result.modifiedCount > 0) {
      res.json({ message: 'Users blocked successfully' });
    } else {
      res.status(404).json({ message: 'No users found to block' });
    }
  } catch (error) {
    console.error('Error blocking users:', error);
    res.status(500).json({ message: 'Error blocking users' });
  }
};

const unblockUsers = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'Invalid input. userIds should be a non-empty array.' });
    }

    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { isBlocked: false }
    );
    if (result.modifiedCount > 0) {
      res.json({ message: 'Users blocked successfully' });
    } else {
      res.status(404).json({ message: 'No users found to block' });
    }
  } catch (error) {
    console.error('Error unblocking users:', error);
    res.status(500).json({ message: 'Error unblocking users' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userIds } = req.body; // Извлечение массива идентификаторов пользователей из тела запроса

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'Invalid input. userIds should be a non-empty array.' });
    }

    // Удаление всех пользователей с указанными идентификаторами
    const result = await User.deleteMany(
      { _id: { $in: userIds } } // Условие поиска пользователей по идентификаторам
    );

    // Проверка, были ли удалены пользователи
    if (result.deletedCount > 0) {
      res.json({ message: 'Users deleted successfully' });
    } else {
      res.status(404).json({ message: 'No users found to delete' });
    }
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ message: 'Error deleting users' });
  }
};

const changeUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    // Проверка валидности роли
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Обновление роли пользователя
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Role updated successfully', user });
  } catch (error) {
    console.error('Error changing user role:', error);
    res.status(500).json({ message: 'Error changing user role' });
  }
};


module.exports = {
  getSingleUserHandler,
  addUsersHandler,
  editUser,
  getAllUserList,
  blockUsers,
  unblockUsers,
  deleteUser,
  changeUserRole

};
