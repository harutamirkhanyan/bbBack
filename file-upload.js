import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Папка для хранения загруженных файлов
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Генерация уникального имени файла
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // Устанавливаем лимит размера файла (50 MB)
});

// Обработка POST-запроса для загрузки файла
app.post('/upload', upload.single('file'), (req, res) => {
  res.send(`Файл загружен: ${req.file.path}`);
});

export default app;
