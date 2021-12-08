import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { JwtService } from '../../shared/jwt/jwt.service';
import { ChatsService } from '../chats/chats.service';

@WebSocketGateway(8002, { namespace: 'notifications', cors: true })
export class NotificationsGateway {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('NotificationsGateway');

    constructor(private readonly jwtService: JwtService, private readonly chatsService: ChatsService) {}

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
