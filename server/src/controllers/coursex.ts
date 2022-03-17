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

const read = (req: Request, res: Response) => {
	const _id = req.params.courseID;
	logging.info(`Reading courseX id: ${_id} `);

	Coursex.findById(_id) //break
		.populate('author')
		.exec()
		.then((course) => {
			if (course) {
				return res.status(200).json({ course });
			} else {
				return res.status(404).json({
					error: 'Course not found'
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
	logging.info('Returning all coursexes');

	Coursex.find() //break
		.populate('author')
		.exec()
		.then((courses) => {
			return res.status(200).json({
				count: courses.length,
				courses
			});
		})
		.catch((error) => {
			logging.error(error.message);
			return res.status(500).json({
				error: error.message
			});
		});
};

const query = (req: Request, res: Response) => {
	logging.info('Querying');

	Coursex.find(req.body) //break
		.populate('author')
		.exec()
		.then((courses) => {
			return res.status(200).json({
				count: courses.length,
				courses
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
	const _id = req.params.courseID;
	logging.info(`Updating course id: ${_id} `);

	Coursex.findById(_id) //break
		.exec()
		.then((course) => {
			if (course) {
				course.set(req.body);
				course
					.save()
					.then((savedCourse) => {
						logging.info(`Course with id ${_id} updated`);
						return res.status(201).json({
							course: savedCourse
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

const deleteCoursex = (req: Request, res: Response) => {
	logging.warn('Delete route called');

	const _id = req.params.courseID;

	Coursex.findByIdAndDelete(_id)
		.exec()
		.then(() => {
			return res.status(201).json({
				message: 'Course deleted'
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
	query,
	update,
	deleteCoursex
};
