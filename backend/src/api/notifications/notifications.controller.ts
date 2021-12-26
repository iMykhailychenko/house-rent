import { Controller, Delete, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';

import { User } from '../../shared/decorators/users.decorator';
import { AuthGuard } from '../../shared/guards/auth.guards';
import { Pagination } from '../../shared/interfaces/interface';

import { NotificationsEntity } from './entities/notifications.entity';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Get('')
    @UseGuards(AuthGuard)
    async getNotifications(
        @User('id') userId: number,
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
    ): Promise<Pagination<NotificationsEntity>> {
        return await this.notificationsService.getNotifications(userId, limit, page);
    }

    @Get('count')
    @UseGuards(AuthGuard)
    async getCountNotifications(@User('id') userId: number): Promise<number> {
        return await this.notificationsService.getCountNotifications(userId);
    }

    @Delete('')
    @UseGuards(AuthGuard)
    async deleteAll(@User('id') userId: number): Promise<void> {
        await this.notificationsService.deleteAll(userId);
    }

    @Delete(':notificationId')
    @UseGuards(AuthGuard)
    async deleteById(@User('id') userId: number, @Param('notificationId', ParseIntPipe) notificationId: number): Promise<void> {
        await this.notificationsService.deleteById(userId, notificationId);
    }
}
