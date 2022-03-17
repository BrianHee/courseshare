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

const read = (req: Request, res: Response) => {
	const _id = req.params.pageID;
	logging.info(`Reading page id: ${_id} `);

	Page.findById(_id) //break
		// .populate('author')
		// .exec()
		.then((page) => {
			if (page) {
				return res.status(200).json({ page });
			} else {
				return res.status(404).json({
					error: 'Page not found'
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
	logging.info('Returning all pages, this route must be edited');

	Page.find() //break
		.populate('author')
		.exec()
		.then((pages) => {
			return res.status(200).json({
				count: pages.length,
				pages
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
	const _id = req.params.pageID;
	logging.info(`Updating Page id: ${_id} `);

	Page.findById(_id) //break
		.exec()
		.then((page) => {
			if (page) {
				page.set(req.body);
				page.save()
					.then((savedPage) => {
						logging.info(`page with id ${_id} updated`);
						return res.status(201).json({
							page: savedPage
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

const deletePage = (req: Request, res: Response) => {
	logging.warn('Delete route called');

	const _id = req.params.pageID;

	Page.findByIdAndDelete(_id)
		.exec()
		.then(() => {
			return res.status(201).json({
				message: 'Page deleted'
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
	deletePage
};
