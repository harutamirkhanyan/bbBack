const { rejects } = require('assert');
const { log } = require('console');
const fs = require('fs');
const path = require('path');

const homeFilePath = path.join(__dirname, '..', 'data', 'homeData.json');



// function readHomeData() {
//  const x= fs.readFile(homeFilePath, 'utf8', (err, data) => {
//     if (err) {
//  
//       return
//     }
//     return JSON.parse(data)
//   })
//   console.log(x)
//   return x
// }

function readHomeData() {
  return new Promise((resolve, reject) => {
    fs.readFile(homeFilePath, 'utf8', (err, data) => {
      if (err) {
        console.log('Error cannot read file')
        reject(err);
        return
      }
      resolve(JSON.parse(data))
    });
  })
}

// function writeUsersToFile(users) {
//   const data = JSON.stringify(users, null, 2);
//   fs.writeFileSync(usersFilePath, data);
// }

// function addUser(newUser) {
//   const users = readUsersFromFile();
//   users.push(newUser);
//   writeUsersToFile(users);
// }

async function homeData() {
  try {
    const data = await readHomeData()
    return data
  } catch (error) {
    throw error
  }
}

// function getUserByUsername(username) {
//   const users = readUsersFromFile();
//   return users.find(user => user.username === username);
// }



async function editArticleById(currentId, updatedData, arrayName) {
  try {
    let data = await readHomeData(); // Получаем данные из файла

    if (data[arrayName]) { // Проверяем, существует ли массив с таким именем
      const index = data[arrayName].findIndex(item => item.id === currentId); // Ищем индекс элемента по currentId

      if (index !== -1) { // Если элемент найден
        // Обновляем только нужные поля
        for (const key in updatedData) {
          if (Object.hasOwnProperty.call(updatedData, key)) {
            data[arrayName][index][key] = updatedData[key];
          }
        }

        // Записываем изменения обратно в файл
        fs.writeFileSync(homeFilePath, JSON.stringify(data, null, 2));
        console.log('true, article was changed');
        return true;
      } else {
        console.log('false, error during article writing: item with given ID not found');
        return false;
      }
    } else {
      console.log('false, error during article writing: array not found');
      return false;
    }
  } catch (error) {
    console.error('Error editing article:', error);
    throw error;
  }
}



module.exports = { homeData, editArticleById };
