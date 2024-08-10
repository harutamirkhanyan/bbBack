const mongoose = require('mongoose');
const User = require('./models/User');
const HomeData = require('./models/HomeData');

mongoose.connect('mongodb://localhost:27017/database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function checkData() {
  const users = await User.find({});
  console.log('Users:', users);

  const homeData = await HomeData.findOne({});
  console.log('Home Data:', homeData);

  mongoose.connection.close();
}

checkData();
