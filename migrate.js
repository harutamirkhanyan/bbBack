const mongoose = require('mongoose');
const User = require('./models/User'); 
const HomeData = require('./models/HomeData'); 
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const homeFilePath = path.join(__dirname, 'data', 'homeData.json');

async function migrate() {
  await mongoose.connect('mongodb://localhost:27017/your_database_name');

  const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  for (const userData of usersData) {
    const user = new User(userData);
    await user.save();
  }

  const homeData = JSON.parse(fs.readFileSync(homeFilePath, 'utf8'));
  const home = new HomeData(homeData);
  await home.save();

  console.log('Migration completed');
  mongoose.connection.close();
}

migrate();
