export enum NotificationsType {
    NEW_CHAT = 'new-chat',
    NEW_MESSAGE = 'new-message',
    NEW_FAVORITE = 'new-favorite',
}

export interface CreateNotification {
    chatId?: number;
    postId?: number;
    userId: number;
    recipientId?: number;
    body?: string;
    type: NotificationsType;
}
