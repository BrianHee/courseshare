import { Request, Response } from 'express';

import Chapter from '../models/Chapter';
import logging from '../config/logging';

const create = async (req: Request, res: Response) => {
	logging.info('attempting to create Chapter');

	const { course, title } = req.body;

	const chapter = new Chapter({
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

const read = (req: Request, res: Response) => {
	const _id = req.params.chapterID;
	logging.info(`Reading chapter id: ${_id} `);

	Chapter.findById(_id) //break
		// .populate('author')
		// .exec()
		.then((chapter) => {
			if (chapter) {
				return res.status(200).json({ chapter });
			} else {
				return res.status(404).json({
					error: 'Chapter not found'
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
	logging.info('Returning all chapters, this route must be edited');

	Chapter.find() //break
		.populate('author')
		.exec()
		.then((chapters) => {
			return res.status(200).json({
				count: chapters.length,
				chapters
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
	const _id = req.params.chapterID;
	logging.info(`Updating chapter id: ${_id} `);

	Chapter.findById(_id) //break
		.exec()
		.then((chapter) => {
			if (chapter) {
				chapter.set(req.body);
				chapter
					.save()
					.then((savedChapter) => {
						logging.info(`chapter with id ${_id} updated`);
						return res.status(201).json({
							chapter: savedChapter
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

const deleteChapter = (req: Request, res: Response) => {
	logging.warn('Delete route called');

	const _id = req.params.chapterID;

	Chapter.findByIdAndDelete(_id)
		.exec()
		.then(() => {
			return res.status(201).json({
				message: 'Chapter deleted'
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
	deleteChapter
};
