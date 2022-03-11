import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import controller from '../controllers/user';

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/autologin', controller.autologin);
router.get('/me', checkAuth, controller.me);

export default router;
