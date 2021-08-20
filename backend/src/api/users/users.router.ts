import express from 'express';
import { singleUserController, userProfileController, usersListController } from './users.controller';
import auth from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', usersListController);
router.get('/profile', auth, userProfileController);
router.get('/:userId', singleUserController);

export default router;
