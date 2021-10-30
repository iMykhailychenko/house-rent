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

import { ChatsService } from './chats.service';
import { MessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@WebSocketGateway(8001, { namespace: 'chat', cors: true })
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('ChatsGateway');

    constructor(private readonly jwtService: JwtService, private readonly chatsService: ChatsService) {}

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('editMessage')
    async editMessage(client: Socket, payload: UpdateMessageDto): Promise<void> {
        const room = this.server.adapter['rooms']?.get(String(payload.chatId));
        if (!room || !room.has(client.id)) throw new WsException('Forbidden');

        const message = await this.chatsService.updateMessage(payload);
        this.server.to(String(payload.chatId)).emit('messageEdited', message);
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('msgToServer')
    async handleMessage(client: Socket, payload: MessageDto): Promise<void> {
        const room = this.server.adapter['rooms']?.get(String(payload.chatId));
        if (!room || !room.has(client.id)) throw new WsException('Forbidden');

        const message = await this.chatsService.createMessage(payload);
        this.server.to(String(payload.chatId)).emit('msgToClient', message);
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('joinChat')
    async handleJoin(client: Socket, chatId: number): Promise<void> {
        await this.chatRoomManager(client.handshake.auth.token, chatId);

        client.join(String(chatId));
        this.server.to(String(chatId)).emit('userJoined', chatId);
    }

    @UsePipes(new ValidationPipe({ transform: true }))
    @SubscribeMessage('leaveChat')
    async handleLeave(client: Socket, chatId: number): Promise<void> {
        await this.chatRoomManager(client.handshake.auth.token, chatId);

        client.leave(String(chatId));
        this.server.to(String(chatId)).emit('userLeft', chatId);
    }

    private async chatRoomManager(token: string, payload: number): Promise<UserEntity> {
        const user = await this.jwtService.verify(token);
        if (!user) throw new WsException('Not authorized');

        const isUserBelongToChat = await this.chatsService.isUserBelongToChat(user.id, payload);
        if (!isUserBelongToChat) throw new WsException('Not permitted');

        return user;
    }

    public afterInit(server: Server): void {
        this.logger.log('Init chat gateway');
    }

    public handleDisconnect(client: Socket): void {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    public handleConnection(client: Socket): void {
        this.logger.log(`Client connected: ${client.id}`);
    }
}
