import Log from '../models/Log.js';

export const createLog = async (req, res, next) => {
  try {
    const { action, user, details } = req.body;

    if (!action || typeof action !== 'string') {
      return res.status(400).json({ message: 'Invalid action' });
    }

    const log = new Log({ action, user, details });
    await log.save();

    res.status(201).json({ message: 'Log saved' });
  } catch (err) {
    next(err);
  }
};

export const getLogs = async (req, res, next) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    next(err);
  }
};