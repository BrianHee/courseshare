import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';

import Course from '../models/Course';
import config from '../config/config';
import validateRegisterInput from '../validation/register';
import logging from '../config/logging';

const create = async (req: Request, res: Response) => {
	logging.info('attempting to create course');

	const { author, title, content, headline, picture } = req.body;

	const course = new Course({
		// id
		author,
		title,
		content,
		headline,
		picture
	});

	return course
		.save() //break
		.then((newCourse) => {
			logging.info('New course created');
			return res.status(201).json({ course: newCourse });
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
	logging.info(`Reading course id: ${_id} `);

	Course.findById(_id) //break
		.populate('author')
		.exec()
		.then((course) => {
			if (course) {
				return res.status(200).json({ course });
			} else {
				console.log('Else block hit course not found');
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
	logging.info('Returning all courses');

	Course.find() //break
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

	Course.find(req.body) //break
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

	Course.findById(_id) //break
		.exec()
		.then((course) => {
			if (course) {
				course.set(req.body);
				course
					.save()
					.then((savedCourse) => {
						logging.info(`Course with id ${_id} updated`);
						return res.json(201).json({
							course: savedCourse
						});
					})
					.catch((error) => {
						logging.error(error.message);
						console.log('update error message entered'); // entering error for some reason when adding image
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

const deleteCourse = (req: Request, res: Response) => {
	logging.warn('Delete route called');

	const _id = req.params.courseID;

	Course.findByIdAndDelete(_id)
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
	deleteCourse
};
