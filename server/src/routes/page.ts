import express from 'express';
import controller from '../controllers/page';

const router = express.Router();

router.post('/create', controller.create);
router.get('/:pageID', controller.read);
router.get('/', controller.readAll);
router.patch('/:pageID', controller.update);
router.delete('/:pageID', controller.deletePage);

export default router;
