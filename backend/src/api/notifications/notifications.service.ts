import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pagination } from '../../shared/interfaces/interface';
import { UserEntity } from '../users/entities/users.entity';

import { NotificationsEntity } from './entities/notifications.entity';
import { NotificationsGateway } from './notifications.gateway';
import { CreateNotification } from './notifications.interface';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(NotificationsEntity) private readonly notificationsRepository: Repository<NotificationsEntity>,
        private readonly notificationsGateway: NotificationsGateway,
    ) {}

    async getNotifications(userId: number, limit = 20, page = 1): Promise<Pagination<NotificationsEntity>> {
        const [result, total] = await this.notificationsRepository.findAndCount({
            relations: ['user'],
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
            take: limit,
            skip: limit * (page - 1),
        });

        return {
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: result,
        };
    }

    async getCountNotifications(userId: number): Promise<number> {
        return await this.notificationsRepository.count({ relations: ['user'], where: { isNew: true, user: { id: userId } } });
    }

    async createNotification({ userId, ...payload }: CreateNotification): Promise<NotificationsEntity> {
        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        const notification = new NotificationsEntity();
        Object.assign(notification, payload);
        this.notificationsGateway.sendNotification(notification);

        return notification;
    }
}
