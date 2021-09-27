import express from 'express';

import auth from '../../middleware/auth.middleware';
import { toggleFavorite } from './favorite.controller';

const router = express.Router();

router.put('/:postId', auth, toggleFavorite);

export default router;
