const User = require('../models/User');

const getSingleUserHandler = async (req, res) => {
  const { username } = req.query;

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

module.exports = {
  getSingleUserHandler,
  addUsersHandler,
  editUser
};
