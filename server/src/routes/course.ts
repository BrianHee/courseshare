import express from 'express';
import controller from '../controllers/course';

const router = express.Router();

router.post('/create', controller.create);
router.get('/:courseID', controller.read);
router.get('/', controller.readAll);
router.post('/query', controller.query);
router.patch('/update', controller.update);
router.delete('/', controller.deleteCourse);

export default router;

// create, read, readAll, query, update, deleteCourse;
