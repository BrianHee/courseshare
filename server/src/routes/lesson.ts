import express from 'express';
import controller from '../controllers/lesson';

const router = express.Router();

router.post('/create', controller.create);
router.get('/:lessonID', controller.read);
router.get('/', controller.readAll);
router.patch('/:lessonID', controller.update);
router.delete('/:lessonID', controller.deleteLesson);

export default router;
