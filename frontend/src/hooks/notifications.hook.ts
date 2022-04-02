import { io, Socket } from 'socket.io-client';

import env from '../config/env.config';

import useAuth from './auth.hook';

class NotificationSocket {
    private static instance: NotificationSocket;
    public readonly client: Socket | undefined;

    constructor(token: string) {
        if (NotificationSocket.instance) return NotificationSocket.instance;

        NotificationSocket.instance = this;
        this.client = io(env.notificationsWs, { auth: { token } });
        this.initEventsListeners();
    }

    private errorHandler = (error: Error): void => {
        console.log(`connect_error due to ${error.message}`);
        console.dir(error);
    };

    private connectHandler = (): void => {
        this.client?.emit('joinNotifications');
    };

    public initEventsListeners = (): void => {
        if (!this.client) return;

        this.client.on('connect', this.connectHandler);
        this.client.on('connect_error', this.errorHandler);
    };

    public unsubscribe = (): void => {
        if (!this.client) return;

        this.client.off('connect', this.connectHandler);
        this.client.off('connect_error', this.errorHandler);
    };
}

export const useNotificationSocket = (): NotificationSocket | null => {
    const { token } = useAuth();
    if (!token?.accessToken || !process.browser) return null;
    return new NotificationSocket(token.accessToken);
};
