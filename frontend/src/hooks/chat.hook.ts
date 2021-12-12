import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';

import { SocketMessagesPayload, UpdateMessagesPayload } from '../state/entities/chats/chats.interface';

import useAuth from './auth.hook';

class ChatSocket {
    private static instance: ChatSocket;
    private readonly chatId: number | undefined;
    public readonly client: Socket | undefined;

    constructor(token: string, chatId: number) {
        if (ChatSocket.instance) return ChatSocket.instance;

        ChatSocket.instance = this;
        this.client = io('ws://localhost:8001/chat', { auth: { token } });
        this.chatId = chatId;
        this.subscribe();
    }

    private errorHandler = (error: Error): void => {
        console.log(`connect_error due to ${error.message}`);
    };

    private connectHandler = (): void => {
        this.client?.emit('joinChat', this.chatId);
    };

    public subscribe = (): void => {
        if (!this.client) return;

        this.client.on('connect', this.connectHandler);
        this.client.on('connect_error', this.errorHandler);
    };

    public unsubscribe = (): void => {
        if (!this.client) return;

        this.client.off('connect', this.connectHandler);
        this.client.off('connect_error', this.errorHandler);
    };

    public switchChat = (newChatId: number): void => {
        this.client?.emit('leaveChat', this.chatId);
        setTimeout(() => {
            this.client?.emit('joinChat', newChatId);
        }, 100);
    };

    public send = (message: SocketMessagesPayload): void => {
        this.client?.emit('msgToServer', message);
    };

    public update = (data: UpdateMessagesPayload): void => {
        this.client?.emit('editMessage', data);
    };
}

export const useChatSocket = (): ChatSocket | null => {
    const { token } = useAuth();
    const history = useRouter();
    const chatId = +String(history.query.chatId);
    if (!token?.accessToken || !chatId || !process.browser) return null;

    return new ChatSocket(token.accessToken, chatId);
};
