import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '../../shared/jwt/jwt.module';
import { PostEntity } from '../posts/entities/posts.entity';
import { UserEntity } from '../users/entities/users.entity';

import { NotificationsEntity } from './entities/notifications.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsService } from './notifications.service';

@Module({
    imports: [TypeOrmModule.forFeature([NotificationsEntity, UserEntity, PostEntity]), HttpModule, JwtModule],
    controllers: [NotificationsController],
    providers: [NotificationsService, NotificationsGateway],
    exports: [NotificationsService],
})
export class NotificationsModule {}
