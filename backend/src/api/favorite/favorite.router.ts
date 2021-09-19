import express from 'express';

import auth from '../../middleware/auth.middleware';
import { addToFavorite } from './favorite.controller';

const router = express.Router();

router.post('/:postId', auth, addToFavorite);

export default router;
