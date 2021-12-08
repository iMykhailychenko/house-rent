import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from '../posts/entities/posts.entity';
import { UserEntity } from '../users/entities/users.entity';

import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, PostEntity]), HttpModule],
    controllers: [SecurityController],
    providers: [SecurityService],
    exports: [SecurityService],
})
export class SecurityModule {}
