const routes = {
    home: '/',
    private: '/private',
    myPosts: '/my-posts',
    chats: {
        init: '/chats',
        messages: (id: string | number): string => `/chats/${id}`,
    },
    auth: {
        login: '/auth/login',
        join: '/auth/join',
        success: '/auth/success',
        reset: '/auth/reset',
    },
    users: {
        profile: (id: string | number): string => `/users/${id}`,
    },
    posts: {
        list: '/posts',
        new: '/posts/new',
        single: (id: string | number): string => `/posts/${id}`,
    },
};

export default routes;
