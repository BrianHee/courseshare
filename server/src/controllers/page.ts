import { Request, Response } from 'express';

import Page from '../models/Page';
import logging from '../config/logging';

const create = async (req: Request, res: Response) => {
	logging.info('attempting to create Page');

	const { chapter, title, content } = req.body;

	const page = new Page({
		chapter,
		title,
		content
	});

	return page
		.save() //break
		.then((newPage) => {
			logging.info('New Page created');
			return res.status(201).json({ page: newPage });
		})
		.catch((error) => {
			logging.error(error);
			return res.status(500).json({
				error
			});
		});
};

export default {
	create
};
