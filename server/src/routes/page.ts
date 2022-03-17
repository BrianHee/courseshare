import express from 'express';
import controller from '../controllers/page';

const router = express.Router();

router.post('/create', controller.create);

export default router;
