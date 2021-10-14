import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { join } from 'path';

import { AuthGuard } from '../../guards/auth.guards';
import { UploadsResponse } from '../../interfaces/upload.interface';

@Controller('media')
export class MediaController {
    @Post('')
    @UseGuards(AuthGuard)
    @UseInterceptors(
        FilesInterceptor('image', 20, {
            storage: diskStorage({
                destination: join(process.cwd(), 'uploads'),
                filename(req, file, cb) {
                    cb(null, `IMG_${Date.now()}_${file.originalname.slice(0, 20)}`);
                },
            }),
        }),
    )
    uploadFile(@UploadedFiles() files: Express.Multer.File[]): UploadsResponse {
        const baseUrl = process.env.BASE_URL || 'http://localhost:8000';
        return { url: `${baseUrl}/media/${files[0].filename}` };
    }
}
