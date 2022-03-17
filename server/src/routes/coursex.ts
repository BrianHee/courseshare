import express from 'express';
import controller from '../controllers/coursex';

const router = express.Router();

router.post('/create', controller.create);
router.get('/:courseID', controller.read);
router.get('/', controller.readAll);
router.post('/query', controller.query);
router.patch('/:courseID', controller.update);
router.delete('/:courseID', controller.deleteCoursex);

export default router;
