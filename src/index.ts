import express, { Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { sequelize } from './config/sequelize';

//router
const authRouter = require('./routers/authRoutes');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../src/swagger/swagger.yaml'));

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.get('/', (res: Response) => res.send('server is running!'));
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/auth', authRouter);

const port = process.env.PORT;

app.listen(port, () => {
  sequelize
    .sync()
    .then(() => console.log('database connected'))
    .catch((err) => console.error('failed to connected database:', err));
  console.log(`server listening on: http://localhost:${port}`);
});
