import { Router } from 'express';
import loginController from '../controller/loginController';
import registerController from '../controller/registerController';

const router = Router();

router.post('/login', loginController);
router.post('/register', registerController);

module.exports = router;
