import express from 'express';
import { singleUserController, userProfileController, userRoleController, usersListController } from './users.controller';
import auth from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', usersListController);
router.get('/profile', auth, userProfileController);
router.get('/:userId', singleUserController);
router.post('/:userId/role', userRoleController);

export default router;
