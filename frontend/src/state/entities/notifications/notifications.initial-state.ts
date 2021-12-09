import { INotificationState } from './notifications.interface';

export const notificationsInitState: INotificationState = {
    status: 'idle',
    error: null,
    count: 0,
    data: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        data: [],
    },
};
