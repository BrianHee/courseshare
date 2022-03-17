import { Request, Response } from 'express';

import Chapter from '../models/Chapter';
import logging from '../config/logging';

const create = async (req: Request, res: Response) => {
	logging.info('attempting to create Chapter');

	const { course, title } = req.body;

	const chapter = new Chapter({
		// id
		course,
		title,
		pagecount: 0
	});

	return chapter
		.save() //break
		.then((newChapter) => {
			logging.info('New chapter created');
			return res.status(201).json({ chapter: newChapter });
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
