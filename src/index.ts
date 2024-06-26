import express, { Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { sequelize } from './config/sequelize';
require('dotenv').config();

//router
const authRouter = require('./routers/authRoutes');
const userRouter = require('./routers/userRoutes');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../src/swagger/swagger.yaml'));

app.use(bodyParser.json());
const corsSetup = {
  origin: '*',
  method: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsSetup));

app.get('/', (res: Response) => {
  res.send('server is running!');
});

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/auth', authRouter);
app.use('/users', userRouter);

const port = process.env.PORT;

app.listen(port, async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  sequelize
    .sync()
    .then(() => console.log('database connected'))
    .catch((err) => console.error('failed to connected database:', err));
  console.log(`server listening on: http://localhost:${port}`);
});
