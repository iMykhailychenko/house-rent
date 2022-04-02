import { UsePipes, ValidationPipe } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { JwtService } from '../../shared/jwt/jwt.service';
import { UserEntity } from '../users/entities/users.entity';

import { ChatsService } from './chats.service';
import { MessageDto } from './dto/create-message.dto';

@WebSocketGateway(8001, { namespace: 'chat', path: '/chat', cors: true })
export class ChatsGateway {
    @WebSocketServer() server: Server;
    constructor(private readonly jwtService: JwtService, private readonly chatsService: ChatsService) {}

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('msgToServer')
    async handleMessage(client: Socket, payload: MessageDto): Promise<void> {
        const room = this.server.adapter['rooms']?.get(String(payload.chatId));
        if (!room || !room.has(client.id)) throw new WsException('Forbidden');

        const message = await this.chatsService.createMessage(payload, [...room].length !== 2);
        this.server.to(String(payload.chatId)).emit('msgToClient', message);
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('joinChat')
    async handleJoin(client: Socket, chatId: number): Promise<void> {
        const user = await this.chatRoomManager(client.handshake.auth.token, chatId);
        client.join(String(chatId));
        this.server.to(String(chatId)).emit('userJoined', { chatId, userId: user.id });
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('leaveChat')
    async handleLeave(client: Socket, chatId: number): Promise<void> {
        const user = await this.chatRoomManager(client.handshake.auth.token, chatId);
        client.leave(String(chatId));
        this.server.to(String(chatId)).emit('userLeft', { chatId, userId: user.id });
    }

    private async chatRoomManager(token: string, payload: number): Promise<UserEntity> {
        const user = await this.jwtService.verify(token);
        if (!user) throw new WsException('Not authorized');

        const isUserBelongToChat = await this.chatsService.isUserBelongToChat(user.id, payload);
        if (!isUserBelongToChat) throw new WsException('Not permitted');

        return user;
    }
}
