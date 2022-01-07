import { Module } from '@nestjs/common';

import { AuthGuard } from '../../shared/guards/auth.guards';

import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
    controllers: [MediaController],
    providers: [AuthGuard, MediaService],
})
export class MediaModule {}
