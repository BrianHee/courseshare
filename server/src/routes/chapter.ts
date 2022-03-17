import express from 'express';
import controller from '../controllers/chapter';

const router = express.Router();

router.post('/create', controller.create);
router.get('/:chapterID', controller.read);
router.get('/', controller.readAll);
router.patch('/:chapterID', controller.update);
router.delete('/:chapterID', controller.deleteChapter);

export default router;
