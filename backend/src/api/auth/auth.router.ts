import express from 'express';
import { joinController, loginController } from './auth.model';

const router = express.Router();

router.get('/login', loginController);
router.get('/join', joinController);

export default router;
