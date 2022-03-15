import express from 'express';
import controller from '../controllers/course';

const router = express.Router();

router.post('/create', controller.create);
router.get('/:courseID', controller.read);
router.get('/', controller.readAll);
router.post('/query', controller.query);
router.patch('/update/:courseID', controller.update);
router.delete('/:courseID', controller.deleteCourse);

export default router;

// create, read, readAll, query, update, deleteCourse;
