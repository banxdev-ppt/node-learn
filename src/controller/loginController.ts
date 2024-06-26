import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const config = require('../config/config');
// import bcrypt from 'bcrypt';

interface IUser {
  id?: number;
  email: string;
  password: string;
}

const users: IUser[] = [{ id: 1, email: 'bank.pptsrm@gmail.com', password: 'password' }];

const authenticateUser = ({ email, password }: IUser) => {
  return users.find((user) => user.email === email && user.password === password);
};

export default async function (req: Request, res: Response) {
  const { email, password } = req.body;

  const user = authenticateUser({ email, password });
  if (!user) {
    console.log('Authentication failed for:', { email, password });
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  try {
    // for database
    // const userPass = user.password;
    // const checkedPass = await bcrypt.compare(password, userPass);
    // console.log(checkedPass);

    // if (!checkedPass) {
    //   return res.status(401).json({ statusCode: 401, taskStatus: false });
    // }

    const token = jwt.sign({ id: user.id, email: user.email }, config.SECRET_KEY, { expiresIn: '1h' });

    const data = { email, password: password, token };
    res.status(200).json({ data: [data], statusCode: 200, taskStatus: true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ statusCode: 500, taskStatus: false });
  }
}
