import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

import User from '../models/User';
import config from '../config/config';
import { checkAuth } from './../middleware/checkAuth';

const router = express.Router();

router.post(
	'/signup',
	body('email').isEmail().withMessage('Email is invalid'),
	body('password').isLength({ min: 5 }).withMessage('Password is too short'),
	async (req, res) => {
		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			const errors = validationErrors.array().map((error) => {
				return {
					msg: error.msg
				};
			});
			return res.json({ errors, data: null });
		}

		// const { handle, email, password } = req.body;
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (user) {
			return res.json({
				errors: [
					{
						msg: 'Email already in use'
					}
				],
				data: null
			});
		}

		const hashedPassword = await bcrypt.hash(password, 5);

		// const newUser = await User.create({
		// 	handle,
		// 	email,
		// 	password: hashedPassword
		// });

		const newUser = await User.create({
			email,
			password: hashedPassword
		});

		const token = await JWT.sign(
			{ email: newUser.email },
			config.jwt_secret,
			{ expiresIn: '14d' }
		);

		res.json({
			errors: [],
			data: {
				token,
				user: {
					id: newUser._id,
					email: newUser.email
				}
			}
		});
	}
);

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		return res.json({
			errors: [
				{
					msg: 'Invalid credentials'
				}
			],
			data: null
		});
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.json({
			errors: [
				{
					msg: 'Invalid credentials'
				}
			],
			data: null
		});
	}

	const token = await JWT.sign({ email: user.email }, config.jwt_secret, {
		expiresIn: '14d'
	});

	return res.json({
		errors: [],
		data: {
			token,
			user: {
				id: user._id,
				email: user.email
			}
		}
	});
});

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

// Format of error returned by .arra() of validationResult(req)
// {
//   "msg": "The error message",
//   "param": "param.name.with.index[0]",
//   "value": "param value",
//   // Location of the param that generated this error.
//   // It's either body, query, params, cookies or headers.
//   "location": "body",

//   // nestedErrors only exist when using the oneOf function
//   "nestedErrors": [{ ... }]
// }
