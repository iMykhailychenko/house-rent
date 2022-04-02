const env = {
    host: process.env.NEXT_PUBLIC_URL || 'http://localhost:8000',
    backand: process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:8000',
    chatWs: process.env.NEXT_PUBLIC_FRONTEND_CHAR_WS || 'ws://localhost:8001/chat',
    notificationsWs: process.env.NEXT_PUBLIC_FRONTEND_NOTIFICATION_WS || 'ws://localhost:8002/notifications',
};

export default env;
