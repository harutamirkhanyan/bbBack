
const HomeData = require('../models/HomeData');

const getHomeData = async (req, res) => {
  try {
    const homeData = await HomeData.findOne();
    res.json(homeData);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving home data' });
  }
};

const saveHomeData = async (req, res) => {
  const { id, data, arrayName } = req.body;

  try {
    const homeData = await HomeData.findOne();
    const array = homeData[arrayName];
    const index = array.findIndex(item => item.id === id);

    if (index !== -1) {
      array[index] = { ...array[index], ...data };
      await homeData.save();
      res.json({ message: 'Data updated successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating home data' });
  }
};

module.exports = {
  getHomeData,
  saveHomeData
};
