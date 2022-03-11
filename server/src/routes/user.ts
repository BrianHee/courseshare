import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

import User from '../models/User';
import config from '../config/config';
import { checkAuth } from '../middleware/checkAuth';
import controller from '../controllers/user';

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/autologin', controller.autologin);

router.get('/me', checkAuth, async (req, res) => {
	const user = await User.findOne({ email: req.user });

	return res.json({
		errors: [],
		data: {
			user: {
				id: user._id,
				email: user.email
			}
		}
	});
});

export default router;
