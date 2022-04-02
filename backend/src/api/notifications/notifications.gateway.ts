import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { JwtService } from '../../shared/jwt/jwt.service';
import { UserEntity } from '../users/entities/users.entity';

import { NotificationsEntity } from './entities/notifications.entity';

@WebSocketGateway(8002, { namespace: 'notifications', path: '/notifications', cors: true })
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('NotificationsGateway');

    constructor(private readonly jwtService: JwtService) {}

    public sendNotification(notification: NotificationsEntity): void {
        this.server.to(String(notification.recipientId)).emit('newNotification', notification);
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('joinNotifications')
    async handleJoin(client: Socket): Promise<void> {
        const user = await this.notificationsRoomManager(client.handshake.auth.token);

        client.join(String(user.id));
        this.server.to(String(user.id)).emit('userJoinedNotifications');
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('leaveNotifications')
    async handleLeave(client: Socket): Promise<void> {
        const user = await this.notificationsRoomManager(client.handshake.auth.token);

        client.leave(String(user.id));
        this.server.to(String(user.id)).emit('userLeftNotifications');
    }

    private async notificationsRoomManager(token: string): Promise<UserEntity> {
        const user = await this.jwtService.verify(token);
        if (!user) throw new WsException('Not authorized');

        return user;
    }

    public afterInit(server: Server): void {
        this.logger.log('Init notifications gateway');
    }

    public handleDisconnect(client: Socket): void {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    public handleConnection(client: Socket): void {
        this.logger.log(`Client connected: ${client.id}`);
    }
}
