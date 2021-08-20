import express from 'express';

import { createPostController, postsListController } from './posts.controller';
import auth from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', postsListController);
router.post('/', auth, createPostController);

export default router;
