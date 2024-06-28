import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';
import bodyParser from 'body-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import './db.js'; // Подключаем к базе данных

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => console.log('Server is listening at port 5000'));
