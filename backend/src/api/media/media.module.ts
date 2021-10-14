import { Module } from '@nestjs/common';

import { AuthGuard } from '../../guards/auth.guards';

import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
    controllers: [MediaController],
    providers: [MediaService, AuthGuard],
})
export class MediaModule {}
