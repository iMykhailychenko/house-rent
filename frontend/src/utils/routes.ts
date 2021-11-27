const routes = {
    home: '/',
    private: '/private',
    favorite: '/favorite',
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
        edit: (id: string | number): string => `/posts/edit/${id}`,
        single: (id: string | number): string => `/posts/${id}`,
    },
};

export default routes;
