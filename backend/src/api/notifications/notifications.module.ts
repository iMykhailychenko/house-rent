import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../users/entities/users.entity';

import { NotificationsEntity } from './entities/notifications.entity';
import { NotificationsService } from './notifications.service';

@Module({
    imports: [TypeOrmModule.forFeature([NotificationsEntity, UserEntity])],
    providers: [NotificationsService],
    exports: [NotificationsService],
})
export class NotificationsModule {}
