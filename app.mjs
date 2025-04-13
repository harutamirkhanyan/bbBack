import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import './db.js'; 
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
dotenv.config();

const app = express();
app.use(express.static(join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:8080', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(router);
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => console.log('Server is listening at port 5000'));
