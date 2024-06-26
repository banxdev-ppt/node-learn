import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

//services
import loginAuth from './authentication/login';
import registerAuth from './authentication/register';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../src/swagger/swagger.yaml'));

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.get('/', (req: Request, res: Response) => {
  res.send('server is running!');
});

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.post('/login', loginAuth);
app.post('/register', registerAuth);

const port = process.env.PORT;
app.listen(port, () => console.log(`server listening on: http://localhost:${port}`));
