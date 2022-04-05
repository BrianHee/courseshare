import { Request, Response } from 'express';

import Course from '../models/Course';
import logging from '../config/logging';

const create = async (req: Request, res: Response) => {
	logging.info('attempting to create COURSEX');

	const { author, title, description } = req.body;

	const course = new Course({
		// id
		author,
		title,
		description,
		lessoncount: 0
	});

	return course
		.save() //break
		.then((newCourse) => {
			logging.info('New COURSEX created');
			return res.status(201).json({ _id: newCourse._id });
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

	Course.findById(_id) //break
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
	logging.info('Returning all coursees');
	const user_id = req.params.userID;

	Course.find({ author: user_id }) //break
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

const getLessons = (req: Request, res: Response) => {
	const _id = req.params.courseID;
	logging.info(`getting related lessons for ${_id}`);

	Course.findById(_id)
		.exec() //break
		.then((course) => {
			if (course) {
				return res.status(200).json({
					lessons: course.lessons
				});
			} else {
				logging.error('Course not found');
				return res.status(404);
			}
		})
		.catch((error) => {
			logging.error(error.message);
			return res.status(500);
		});
};

const addLesson = (req: Request, res: Response) => {
	const _id = req.params.courseID;
	const { lessonId, lessonTitle } = req.body;

	Course.findOneAndUpdate({ _id: _id }, { $push: { lessons: { lessonId, lessonTitle } } }, { new: true })
		.then((course) => {
			if (course) {
				return res.status(201).json({
					lessons: course.lessons
				});
			} else {
				logging.error('Could not add lesson');
				return res.status(404);
			}
		})
		.catch((error) => {
			logging.error(error.message);
			return res.status(500);
		});
};

const deleteLesson = (req: Request, res: Response) => {
	const _id = req.params.courseID;
	const lessonId = req.params.lessonID;
	console.log('removing from lesson from course', _id, lessonId);

	Course.findOneAndUpdate({ _id }, { $pull: { lessons: { lessonId } } }, { new: true })
		.then((course) => {
			if (course) {
				logging.info('Lesson removed from course');
				return res.status(201).json({
					lessons: course.lessons
				});
			} else {
				logging.error('Could not add lesson');
				return res.status(404);
			}
		})
		.catch((error) => {
			logging.error(error.message);
			return res.status(500);
		});
};

const updateLessonTitle = (req: Request, res: Response) => {
	const _id = req.params.courseID;
	const lessonId = req.params.lessonID;
	const { lessonTitle } = req.body;
	console.log('Updating lesson Title', _id, lessonId);

	Course.findOneAndUpdate(
		{ _id, 'lessons.lessonId': lessonId },
		{ $set: { 'lessons.$.lessonTitle': lessonTitle } },
		{ new: true }
	)
		.then((course) => {
			if (course) {
				logging.info('Lesson title updated');
				return res.status(201).json({
					lessons: course.lessons
				});
			} else {
				logging.error('Could not update lesson');
				return res.status(404);
			}
		})
		.catch((error) => {
			logging.error(error.message);
			return res.status(500);
		});
};

export default {
	create,
	read,
	readAll,
	query,
	update,
	deleteCourse,
	getLessons,
	addLesson,
	deleteLesson,
	updateLessonTitle
};
