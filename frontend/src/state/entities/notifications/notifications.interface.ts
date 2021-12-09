import { IUser, Pagination } from '../../../interfaces';
import { CommonState } from '../../interfaces/common';

export enum NotificationsType {
    NEW_CHAT = 'new-chat',
    NEW_MESSAGE = 'new-message',
    NEW_FAVORITE = 'new-favorite',
}

export interface INotification {
    id: number;
    createdAt: Date;
    isNew: boolean;
    recipientId: number;
    chatId: number;
    postId: number;
    user: IUser;
    type: NotificationsType;
}

export type INotificationState = CommonState<Pagination<INotification>> & { count: number };
