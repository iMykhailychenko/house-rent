import { Module } from '@nestjs/common';

import { AuthGuard } from '../../shared/guards/auth.guards';

import { MediaController } from './media.controller';

@Module({
    controllers: [MediaController],
    providers: [AuthGuard],
})
export class MediaModule {}
