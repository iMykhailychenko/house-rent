import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const useChatSocket = (): Socket => {
    if (socket) return socket;

    socket = io('http://localhost:8001/api/v1/messages');

    socket.on('connect', () => {
        console.log('connect', socket);
    });

    socket.on('message', msg => {
        console.log('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('connect', socket);
    });

    return socket;
};
