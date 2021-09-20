import express from 'express';

import auth from '../../middleware/auth.middleware';
import { addToFavorite, deleteFromFavorite } from './favorite.controller';

const router = express.Router();

router.post('/:postId', auth, addToFavorite);
router.delete('/:postId', auth, deleteFromFavorite);

export default router;
