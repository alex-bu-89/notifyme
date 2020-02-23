import express from 'express';
import terminController from './controllers/terminController';

const router = express.Router();

router.get('/termins', terminController.getAll);

export default router;
