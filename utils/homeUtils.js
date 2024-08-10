const { rejects } = require('assert');
const { log } = require('console');
const fs = require('fs');
const path = require('path');

const homeFilePath = path.join(__dirname, '..', 'data', 'homeData.json');



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


async function homeData() {
  try {
    const data = await readHomeData()
    return data
  } catch (error) {
    throw error
  }
}


async function editArticleById(currentId, updatedData, arrayName) {
  try {
    let data = await readHomeData();

    if (data[arrayName]) {
      const index = data[arrayName].findIndex(item => item.id === currentId);

      if (index !== -1) {
        for (const key in updatedData) {
          if (Object.hasOwnProperty.call(updatedData, key)) {
            data[arrayName][index][key] = updatedData[key];
          }
        }

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
