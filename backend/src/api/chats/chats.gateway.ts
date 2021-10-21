import { UsePipes, ValidationPipe } from '@nestjs/common';
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

import { ChatsService } from './chats.service';
import { MessageDto } from './dto/create-message.dto';

@WebSocketGateway(8001, { namespace: 'chat', cors: true })
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    constructor(private readonly jwtService: JwtService, private readonly chatsService: ChatsService) {}

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('msgToServer')
    async handleMessage(client: Socket, payload: MessageDto): Promise<void> {
        const message = await this.chatsService.createMessage(payload);
        this.server.to(String(payload.chatId)).emit('msgToClient', message);
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('joinChat')
    async handleJoin(client: Socket, payload: number): Promise<void> {
        const user = await this.chatRoomManager(client.handshake.auth.token, payload);
        client.join(String(payload));
        this.server.emit('userJoined', user.id);
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('leaveChat')
    async handleLeave(client: Socket, payload: number): Promise<void> {
        const user = await this.chatRoomManager(client.handshake.auth.token, payload);
        client.leave(String(payload));
        this.server.emit('userLeft', user.id);
    }

    public afterInit(server: Server): void {
        console.log('Init chat gateway');
    }

    public handleDisconnect(client: Socket): void {
        console.log(`Client disconnected: ${client.id}`);
    }

    public handleConnection(client: Socket): void {
        console.log(`Client connected: ${client.id}`);
    }

    private async chatRoomManager(token: string, payload: number): Promise<UserEntity> {
        const user = await this.jwtService.verify(token);
        if (!user) throw new WsException('Not authorized');

        const isUserBelongToChat = await this.chatsService.isUserBelongToChat(user.id, payload);
        if (!isUserBelongToChat) throw new WsException('Not permitted');

        return user;
    }
}
