const HomeData = require('../models/HomeData');

const getHomeData = async (req, res) => {
  try {
    const homeData = await HomeData.findOne().lean();
    if (homeData) {
      const { _id, __v, ...filteredData } = homeData;
      res.json(filteredData);
    } else {
      res.status(404).json({ message: 'Данные не найдены' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении данных', error });
  }
};

const changeHomeData = async (req, res) => {
  const { id, data, arrayName } = req.body;
  try {
    const homeData = await HomeData.findOne();
    if (homeData && homeData[arrayName]) {
      const array = homeData[arrayName];
      const index = array.findIndex(item => item.id === id);
      if (index !== -1) {
        array[index] = { ...array[index], ...data };
        await homeData.save();
        const { _id, __v, ...filteredData } = homeData.toObject();
        res.json(filteredData);
      } else {
        res.status(404).json({ message: 'Элемент не найден' });
      }
    } else {
      res.status(404).json({ message: 'Массив не найден' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении данных', error });
  }
};

const addHomeData = async (req, res) => {
  
  const { data, arrayName } = req.body;
  console.log(req.body)
  try {
    const homeData = await HomeData.findOne();

    if (homeData && homeData[arrayName]) {
      homeData[arrayName].push(data);
      await homeData.save();

      const { _id, __v, ...filteredData } = homeData.toObject();
      res.json(filteredData);
    } else {
      res.status(404).json({ message: 'Массив не найден' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении данных', error });
  }
};

const deleteHomeData = async (req, res) => {
  const { ids, arrayName } = req.body;
  try {
    const homeData = await HomeData.findOne();
    if (homeData && homeData[arrayName]) {
      homeData[arrayName] = homeData[arrayName].filter(
        item => !ids.includes(item.id)
      );
      await homeData.save();
      const { _id, __v, ...filteredData } = homeData.toObject();
      res.json(filteredData);
    } else {
      res.status(404).json({ message: 'Массив не найден' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении данных', error });
  }
};

module.exports = {
  getHomeData,
  changeHomeData,
  addHomeData,
  deleteHomeData
};
