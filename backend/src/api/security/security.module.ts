import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../users/entities/users.entity';

import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [SecurityController],
    providers: [SecurityService],
    exports: [SecurityService],
})
export class SecurityModule {}
