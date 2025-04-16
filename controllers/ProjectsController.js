import Project from '../models/Project.js';
import Log from '../models/Log.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

export const addProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const newProject = await Project.create({ title, description, image });

    await Log.create({
      user: req.userId,
      action: `Project created: ${title}`,
    });

    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create project' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }
    );

    await Log.create({
      user: req.userId,
      action: `Project updated: ${updated.title}`,
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    await Log.create({
      user: req.userId,
      action: `Project deleted: ${deleted.title}`,
    });

    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete project' });
  }
};
