import express from 'express';
import { joinController, loginController } from './auth.controller';

const router = express.Router();

router.post('/join', joinController);
router.post('/login', loginController);

export default router;
