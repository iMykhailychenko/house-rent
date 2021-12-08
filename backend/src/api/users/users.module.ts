import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../../shared/guards/auth.guards';
import { PostEntity } from '../posts/entities/posts.entity';
import { SecurityService } from '../security/security.service';

import { UserEntity } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, PostEntity]), HttpModule],
    controllers: [UsersController],
    providers: [UsersService, SecurityService, AuthGuard],
    exports: [UsersService],
})
export class UsersModule {}
