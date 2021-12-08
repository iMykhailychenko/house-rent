import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from '../../api/posts/entities/posts.entity';
import { SecurityService } from '../../api/security/security.service';
import { UserEntity } from '../../api/users/entities/users.entity';
import { UsersService } from '../../api/users/users.service';

import { JwtService } from './jwt.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, PostEntity]), HttpModule],
    providers: [JwtService, UsersService, SecurityService],
    exports: [JwtService],
})
export class JwtModule {}
