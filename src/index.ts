import express, { Request, Response } from 'express';
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

app.get('/', (req: Request, res: Response) => {
  res.send('server is running!');
});

//routes
app.use('/auth', authRouter);
app.use('/users', userRouter);

//api documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//database sync connection
async function databaseConnected() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('database connected');
    return true;
  } catch (error) {
    console.error('Unable to connect and synchronize database:', error);
    return false;
  }
}

const port = process.env.PORT;

databaseConnected().then(() => {
  app.listen(port, () => {
    console.log(`server listening on: http://localhost:${port}`);
  });
});
