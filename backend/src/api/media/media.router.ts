import express from 'express';
import multer from 'multer';
import path from 'path';
import { getMediaController, uploadMediaController } from './media.controller';

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, path.join(process.cwd(), 'uploads'));
        },
        filename(req, file, cb) {
            cb(null, `IMG_${Date.now()}_${file.originalname}`);
        },
    }),
});

router.post('/', upload.single('image'), uploadMediaController);
router.get('/:fileName', getMediaController);

export default router;
