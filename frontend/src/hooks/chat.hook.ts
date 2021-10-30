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
        this.initEventsListeners(chatId);
    }

    initEventsListeners = (chatId: number): void => {
        if (!this.client) return;

        this.client.on('connect', () => {
            this.client?.emit('joinChat', chatId);
        });

        this.client.on('userJoined', msg => {
            console.log('userJoined ' + msg);
        });
        this.client.on('leaveChat', msg => {
            console.log('leaveChat ' + msg);
        });
        this.client.on('connect_error', error => {
            console.log(`connect_error due to ${error.message}`);
        });
    };

    switchChat = (newChatId: number): void => {
        this.client?.emit('leaveChat', this.chatId);
        this.client?.emit('joinChat', newChatId);
    };

    send = (message: SocketMessagesPayload): void => {
        this.client?.emit('msgToServer', message);
    };

    update = (data: UpdateMessagesPayload): void => {
        this.client?.emit('editMessage', data);
    };
}

export const useChatSocket = (): ChatSocket | null => {
    const [auth] = useAuth();
    const history = useRouter();
    const chatId = +String(history.query.chatId);
    if (!auth?.accessToken || !chatId || !process.browser) return null;
    return new ChatSocket(auth.accessToken, chatId);
};
