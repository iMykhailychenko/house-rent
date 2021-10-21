import { useRouter } from 'next/router';
import { io, Socket } from 'socket.io-client';

import { pushMessage } from '../state/entities/chats/chats.reducer';

import useAuth from './auth.hook';
import { useAppDispatch } from './redux.hook';

let socket: Socket;

export const useChatSocket = (): Socket | null => {
    const [auth] = useAuth();
    const dispatch = useAppDispatch();
    const history = useRouter();
    const chatId = +String(history.query.chatId);

    if (!auth?.accessToken || !chatId || !process.browser) return null;

    if (socket) return socket;

    socket = io('http://localhost:8001/chat', {
        auth: {
            token: auth.accessToken,
        },
    });

    socket.on('connect', () => {
        socket.emit('joinChat', chatId);
    });

    socket.on('disconnect', () => {
        console.log('disconnect', chatId);
    });

    socket.on('userJoined', msg => {
        console.log('userJoined ' + msg);
    });

    socket.on('msgToClient', msg => {
        dispatch(pushMessage(msg));
    });

    return socket;
};
