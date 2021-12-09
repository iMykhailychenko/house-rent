import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../../shared/guards/auth.guards';
import { PostEntity } from '../posts/entities/posts.entity';
import { SecurityModule } from '../security/security.module';

import { UserEntity } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, PostEntity]), HttpModule, SecurityModule],
    controllers: [UsersController],
    providers: [UsersService, AuthGuard],
    exports: [UsersService],
})
export class UsersModule {}
