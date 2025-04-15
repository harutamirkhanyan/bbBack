import Project from '../models/Project.js';
import Log from '../models/Log.js';
import path from 'path';
import fs from 'fs';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const addProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newProject = await Project.create({ title, description, image });

    await Log.create({
      user: req.userId,
      action: `Добавлен проект: ${title}`,
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Ошибка при создании проекта' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

    await Log.create({
      user: req.userId,
      action: `Обновлён проект: ${updated.title}`,
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при обновлении проекта' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    await Log.create({
      user: req.userId,
      action: `Удалён проект: ${deleted.title}`,
    });

    res.json({ message: 'Проект удалён' });
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при удалении проекта' });
  }
};