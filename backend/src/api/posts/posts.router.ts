import express from 'express';

import { createPostController, postsListController, singlePostController, updatePostController } from './posts.controller';
import auth from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/', postsListController);
router.get('/:postId', singlePostController);
router.post('/', auth, createPostController);
router.put('/:postId', auth, updatePostController);

export default router;
