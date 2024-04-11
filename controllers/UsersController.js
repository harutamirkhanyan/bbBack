const fs = require('fs');
const { getUserByUsername, editUserByUsername } = require('../utils/userUtils')
// const qs = require('querystring')

const getUsersHandler = (req, res) => {
  res.send('Get users route')
}


const getSingleUserHandler = (req, res) => {
  const username = req.query.username;
  const user = getUserByUsername(username)
  res.send(JSON.stringify(user))
}



const addUsersHandler = (req, res, next) => {
  let data = ''
  req.on('data', (chunk) => {
    data += chunk.toString()
    console.log(data.toString(), 'data')
  })

  fs.writeFile('./first.txt', data.toString(), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('File first.txt was  written')
      fs.appendFile('./first.txt', data, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Text added');
        }
      });
    }
  });

  res.send('User added')
}

const editUser = (req, res, next) => {
  const data=req.body.data
  console.log(data)
  const currentUsername=req.body.currentUsername
  editUserByUsername(currentUsername, data)
  const changedUsername=data.username 
  const user = getUserByUsername(changedUsername);
  res.json({ user})
}

module.exports = {
  getUsersHandler,
  getSingleUserHandler,
  addUsersHandler,
  editUser
}


