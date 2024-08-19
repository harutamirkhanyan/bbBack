const mongoose = require('mongoose');
const User = require('./models/User');
const HomeData = require('./models/HomeData');

async function deleteData() {
  // Подключаемся к базе данных
  await mongoose.connect('mongodb://localhost:27017/database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Удаление всех документов из коллекции User
    await User.deleteMany({});
    console.log('All users have been deleted.');

    // Удаление всех документов из коллекции HomeData
    await HomeData.deleteMany({});
    console.log('All home data have been deleted.');
  } catch (error) {
    console.error('Error deleting data:', error);
  } finally {
    // Закрываем соединение с базой данных
    mongoose.connection.close();
  }
}

deleteData();
