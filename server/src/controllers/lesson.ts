import { Request, Response } from 'express';

import Lesson from '../models/Lesson';
import logging from '../config/logging';

const create = async (req: Request, res: Response) => {
	logging.info('attempting to create Lesson');

	const { course, title, content } = req.body;

	const lesson = new Lesson({
		course,
		title,
		content
	});

	return lesson
		.save() //break
		.then((newLesson) => {
			logging.info('New Lessoln created');
			return res.status(201).json({ lesson: newLesson });
		})
		.catch((error) => {
			logging.error(error);
			return res.status(500).json({
				error
			});
		});
};

const read = (req: Request, res: Response) => {
	const _id = req.params.lessonID;
	logging.info(`Reading lesson id: ${_id} `);

	Lesson.findById(_id) //break
		// .populate('author')
		// .exec()
		.then((lesson) => {
			if (lesson) {
				return res.status(200).json({ lesson });
			} else {
				return res.status(404).json({
					error: 'Lesson not found'
				});
			}
		})
		.catch((error) => {
			logging.error(error.message);
			return res.status(500).json({
				error: error.message
			});
		});
};

const readAll = (req: Request, res: Response) => {
	logging.info('Returning all lesson, this route must be edited');

	Lesson.find() //break
		.populate('author')
		.exec()
		.then((lessons) => {
			return res.status(200).json({
				count: lessons.length,
				lessons
			});
		})
		.catch((error) => {
			logging.error(error.message);
			return res.status(500).json({
				error: error.message
			});
		});
};

const update = (req: Request, res: Response) => {
	const _id = req.params.lessonID;
	logging.info(`Updating Lesson id: ${_id} `);

	Lesson.findById(_id) //break
		.exec()
		.then((lesson) => {
			if (lesson) {
				lesson.set(req.body);
				lesson
					.save()
					.then((savedLesson) => {
						logging.info(`Lesson with id ${_id} updated`);
						return res.status(201).json({
							lesson: savedLesson
						});
					})
					.catch((error) => {
						logging.error(error.message);
						return res.status(500).json({
							error: error.message
						});
					});
			} else {
				return res.status(401).json({
					error: 'Not Found'
				});
			}
		})
		.catch((error) => {
			logging.error(error.message);

			return res.status(500).json({
				error: error.message
			});
		});
};

const deleteLesson = (req: Request, res: Response) => {
	logging.warn('Delete route called');

	const _id = req.params.lessonID;

	Lesson.findByIdAndDelete(_id)
		.exec()
		.then(() => {
			return res.status(201).json({
				message: 'Lesson deleted'
			});
		})
		.catch((error) => {
			logging.error(error.message);

			return res.status(500).json({
				error: error.message
			});
		});
};

export default {
	create,
	read,
	readAll,
	update,
	deleteLesson
};
