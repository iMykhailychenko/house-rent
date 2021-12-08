export enum NotificationsType {
    NEW_MESSAGE = 'new-message',
    NEW_FAVORITE = 'new-favorite',
}

export interface NewMessageNotification {
    chatId: number;
    postId: number;
    userId: number;
    recipientId: number;
    type: NotificationsType;
}
