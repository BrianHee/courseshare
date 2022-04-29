import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';

import logging from '../config/logging';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
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
		const user = JWT.verify(token, `${process.env.JWT_SECRET}`) as {
			email: string;
		};

		req.user = user.email;

		next();
	} catch (error) {
		logging.error(error);
		return res.status(403).json({
			error
		});
	}
};
