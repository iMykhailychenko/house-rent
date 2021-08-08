import express from 'express';
import { usersListController } from './users.controller';

const router = express.Router();

router.get('/', usersListController);

export default router;
