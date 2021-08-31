const routes = {
    home: '/',
    auth: {
        login: '/auth/login',
        join: '/auth/join',
        success: '/auth/success',
        reset: '/auth/reset',
    },
    posts: {
        list: '/posts',
        new: '/posts/new',
        single: (id: string | number): string => `/posts/${id}`,
    },
};

export default routes;
