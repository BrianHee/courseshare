import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';

import config from '../config/config';
import logging from '../config/logging';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
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
		const user = JWT.verify(token, config.jwt_secret) as {
			email: string;
		};

		req.user = user.email;

		next();
	} catch (error) {
		logging.error(error);
		return res.status(403).json({
			error
			// error: [
			// 	{
			// 		msg: 'unauthorized'
			// 	}
			// ]
		});
	}
};
