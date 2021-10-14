import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { join } from 'path';

import { UploadsResponse } from '../../interfaces/upload.interface';

@Controller('media')
export class MediaController {
    @Post('')
    @UseInterceptors(
        FilesInterceptor('files', 20, {
            storage: diskStorage({
                destination: join(process.cwd(), 'uploads'),
                filename(req, file, cb) {
                    cb(null, `IMG_${Date.now()}_${file.originalname.slice(0, 20)}`);
                },
            }),
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File): UploadsResponse {
        const baseUrl = process.env.BASE_URL || 'http://localhost:8000';
        return { url: `${baseUrl}/media/${file.filename}` };
    }
}
