const { homeData, editArticleById } = require('../utils/homeUtils')


const getHomeData = (req, res) => {
  homeData().then((resolve, reject) => {
    try {
      res.send(resolve)
    } catch {
      res.send({ reject })
    }
  })
}

const saveHomeData = (req, res) => {
  const data = req.body.data
  const id = req.body.id
  const arrayName = req.body.arrayName

  editArticleById(id, data, arrayName)
}

module.exports = {
  getHomeData,
  saveHomeData
}
