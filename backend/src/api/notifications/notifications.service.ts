import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pagination } from '../../shared/interfaces/interface';
import { UserEntity } from '../users/entities/users.entity';

import { NotificationsEntity } from './entities/notifications.entity';
import { NotificationsGateway } from './notifications.gateway';
import { CreateNotification, NotificationsType } from './notifications.interface';

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
            where: { recipientId: userId },
            order: { createdAt: 'DESC' },
            take: limit,
            skip: limit * (page - 1),
        });

        await this.notificationsRepository
            .createQueryBuilder()
            .update(NotificationsEntity)
            .set({ isNew: false })
            .where('recipientId = :userId AND isNew = TRUE', { userId })
            .execute();

        return {
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: result,
        };
    }

    async getCountNotifications(userId: number): Promise<number> {
        return await this.notificationsRepository.count({ where: { isNew: true, recipientId: userId } });
    }

    async createNotification({ userId, ...payload }: CreateNotification): Promise<NotificationsEntity> {
        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        const notification = new NotificationsEntity();
        Object.assign(notification, payload);
        notification.user = user;

        const newNotification = await this.notificationsRepository.save(notification);
        this.notificationsGateway.sendNotification(newNotification);

        return newNotification;
    }

    async deleteAll(userId: number): Promise<void> {
        await this.notificationsRepository.delete({ recipientId: userId });
    }

    async deleteById(userId: number, notificationId: number): Promise<void> {
        const notification = await this.notificationsRepository.findOne(notificationId);

        if (!notification) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        if (notification.recipientId !== userId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        await this.notificationsRepository.delete(notification.id);
    }
}
