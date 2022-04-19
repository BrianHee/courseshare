import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';

import User from '../models/User';
import config from '../config/config';
import validateRegisterInput from '../validation/register';

// Validate registration info, and then proceed with registration 3/8

const register = async (req: Request, res: Response) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		const errorsArray = Object.keys(errors).map((key) => errors[key]);

		return res.json({ errors: [...errorsArray] });
	}

	const { firstName, lastName, email, password } = req.body;

	const user = await User.findOne({ email });

	if (user) {
		return res.json({
			errors: ['Email already in use']
		});
	}

	const hashedPassword = await bcrypt.hash(password, 5);

	const newUser = await User.create({
		firstName,
		lastName,
		email,
		password: hashedPassword
	});

	const token = await JWT.sign({ email: newUser.email }, config.jwt_secret, {
		expiresIn: '7d'
	});

	return res.json({
		errors: [],
		data: {
			token,
			user: {
				_id: newUser._id,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				email: newUser.email
			}
		}
	});
};

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(500).json({
			errors: ['Invalid credentials']
		});
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		return res.status(500).json({
			errors: ['Invalid credentials']
		});
	}

	const token = await JWT.sign({ email: user.email }, config.jwt_secret, {
		expiresIn: '7d'
	});

	return res.status(200).json({
		errors: [],
		data: {
			token,
			user: {
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email
			}
		}
	});
};

const autologin = async (req: Request, res: Response) => {
	let { token } = req.body;

	try {
		const tokenToEmail = JWT.verify(token, config.jwt_secret) as {
			email: string;
		};
		const email = tokenToEmail.email;

		const user = await User.findOne({ email });
		if (user) {
			return res.json({
				errors: [],
				data: {
					user: {
						_id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email
					}
				}
			});
		}
	} catch (error) {
		return res.json({
			error: error
		});
	}
};

const me = async (req: Request, res: Response) => {
	const user = await User.findOne({ email: req.user });

	return res.json({
		errors: [],
		data: {
			user: {
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email
			}
		}
	});
};

export default {
	register,
	login,
	autologin,
	me
};
