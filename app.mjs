import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/index.js'
import bodyParser from 'body-parser'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express();
app.use(express.static(join(__dirname, 'public')))
app.use(cors());
app.use(bodyParser.json());
app.use(router)
// logs info about request
app.use(morgan('tiny'));
// converts JSON to JS Object in POST, PUT, PATCH requests
app.use(express.json());
// converts form data to JS Object in POST, PUT, PATCH requests
app.use(express.urlencoded({ extended: true }));

// app.use((req, res) => {
//     const personData = {
//         name: 'Harut',
//         isInstructor: 'true',
//     };
//     console.log(req.body);
//     return res.json(personData);
// });

app.listen(5000, () => console.log('server is listening at port 5000'));