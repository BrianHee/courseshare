import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';

import config from '../config/config';

export const checkAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// console.log('hello i am middleware');
	// return res.send('Not authenticated');
	let token = req.header('authorization');

	if (!token) {
		return res.status(403).json({
			error: [
				{
					msg: 'unauthorized'
				}
			]
		});
	}

	token = token.split(' ')[1];

	try {
		const user = (await JWT.verify(token, config.jwt_secret)) as {
			email: string;
		};

		req.user = user.email;
		next();
	} catch (error) {
		return res.status(403).json({
			error: [
				{
					msg: 'unauthorized'
				}
			]
		});
	}
};
