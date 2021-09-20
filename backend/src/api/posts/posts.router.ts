import express from 'express';

import { createPostController, postsListController, singlePostController, updatePostController } from './posts.controller';
import auth, { checkAuth } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', checkAuth, postsListController);
router.get('/:postId', checkAuth, singlePostController);
router.post('/', auth, createPostController);
router.put('/:postId', auth, updatePostController);

export default router;
