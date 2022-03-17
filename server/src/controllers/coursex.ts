import { Request, Response } from 'express';

import Coursex from '../models/Coursex';
import logging from '../config/logging';

const create = async (req: Request, res: Response) => {
	logging.info('attempting to create COURSEX');

	const { author, title, description, picture } = req.body;

	const coursex = new Coursex({
		// id
		author,
		title,
		description,
		picture,
		chaptercount: 0
	});

	return coursex
		.save() //break
		.then((newCoursex) => {
			logging.info('New COURSEX created');
			return res.status(201).json({ course: newCoursex });
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
