import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

//services
import loginAuth from './authentication/login';
import registerAuth from './authentication/register';

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.get('/', (req: Request, res: Response) => {
  res.send('server is running!');
});

app.post('/login', loginAuth);
app.post('/register', registerAuth);

const port = process.env.PORT;
app.listen(port, () => console.log(`server listening on: http://localhost:${port}`));
