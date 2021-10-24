import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';

import { Message, SocketMessagesPayload } from '../state/entities/chats/chats.interface';
import { pushMessage } from '../state/entities/chats/chats.reducer';

import useAuth from './auth.hook';
import { ThunkAppDispatch, useAppDispatch } from './redux.hook';

type SocketMsgHandler = (msg: Message) => void;
class ChatSocket {
    static _instance: ChatSocket | null = null;
    private readonly client: Socket | undefined;
    private readonly chatId: number | undefined;
    private readonly dispatch: ThunkAppDispatch | undefined;

    constructor(token: string, chatId: number, dispatch: ThunkAppDispatch) {
        if (ChatSocket._instance) return ChatSocket._instance;

        ChatSocket._instance = this;
        this.client = io('http://localhost:8001/chat', { auth: { token } });
        this.chatId = chatId;
        this.dispatch = dispatch;
        this.initEventsListeners(chatId);
    }

    initEventsListeners = (chatId: number): void => {
        if (!this.client || !this.dispatch) return;

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
        this.client.on('msgToClient', (msg: Message) => {
            if (this.dispatch) {
                this.dispatch(pushMessage(msg));
            }
        });
    };

    switchChat = (newChatId: number): void => {
        // this.client?.emit('leaveChat', this.chatId);
        // this.client?.emit('joinChat', newChatId);
        this.client?.disconnect();
        this.client?.off('connect');

        this.client?.connect();
        this.client?.on('connect', () => {
            this.client?.emit('joinChat', newChatId);
        });
    };

    send = (message: SocketMessagesPayload): void => {
        this.client?.emit('msgToServer', message);
    };
}

export const useChatSocket = (): ChatSocket | null => {
    const [auth] = useAuth();
    const dispatch = useAppDispatch();
    const history = useRouter();
    const chatId = +String(history.query.chatId);
    if (!auth?.accessToken || !chatId || !process.browser) return null;
    return new ChatSocket(auth.accessToken, chatId, dispatch);
};
