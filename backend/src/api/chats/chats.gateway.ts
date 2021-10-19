import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8001, { path: 'api/v1/messages', cors: true })
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    afterInit(server: Server): void {
        console.log('ChatsGateway initialized');
    }

    handleConnection(client: Socket, ...args: any[]): void {
        console.log('handle connection');
        // console.log(client, args);
    }

    handleDisconnect(client: Socket): void {
        console.log('handle disconnect');
        // console.log(client);
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: string): void {
        console.log(payload);
        this.server.emit('message', payload);
    }
}
