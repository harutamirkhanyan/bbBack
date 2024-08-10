const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname,'..', 'data', 'users.json');

function readUsersFromFile() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeUsersToFile(users) {
  const data = JSON.stringify(users, null, 2);
  fs.writeFileSync(usersFilePath, data);
}

function addUser(newUser) {
  const users = readUsersFromFile();
  users.push(newUser);
  writeUsersToFile(users);
}

function getUsers() {
  return readUsersFromFile();
}

function getUserByUsername(username) {
  const users = readUsersFromFile();
  return users.find(user => user.username === username);
}


function editUserByUsername(currentUsername, updatedData) {
  let users = readUsersFromFile();
  const index = users.findIndex(user => user.username === currentUsername);

  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData };
    writeUsersToFile(users);
    console.log('true, user was changed');
    // return true;
  } else {
    console.log('false, error during user writing');
    // return false;
  }
}



module.exports = { addUser, getUsers, getUserByUsername, editUserByUsername };
