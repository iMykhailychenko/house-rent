import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from '../../shared/guards/auth.guards';

import { UploadsResponse } from './media.interface';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post('')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadsResponse> {
        const media = await this.mediaService.uploadPublicFile(file.buffer);
        return { url: media.Location };
    }
}
