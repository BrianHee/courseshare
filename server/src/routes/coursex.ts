import express from 'express';
import controller from '../controllers/coursex';

const router = express.Router();

router.post('/create', controller.create);

export default router;
