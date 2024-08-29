const User = require('../models/User');


const verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.sendStatus(404);
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};


module.exports = {
  verifyToken
};



