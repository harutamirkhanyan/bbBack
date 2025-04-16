import express from 'express';
import multer from 'multer';
import path from 'path';
import { getProjects, addProject, updateProject, deleteProject } from '../controllers/ProjectsController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.get('/', getProjects);
router.post('/', verifyToken, upload.single('image'), addProject);
router.put('/:id', verifyToken, upload.single('image'), updateProject);
router.delete('/:id', verifyToken, deleteProject);

export default router;
