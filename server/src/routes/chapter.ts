import express from 'express';
import controller from '../controllers/chapter';

const router = express.Router();

router.post('/create', controller.create);

export default router;
