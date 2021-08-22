const routes = {
    home: '/',
    auth: {
        login: '/auth/login',
        join: '/auth/join',
        success: '/auth/success',
        reset: '/auth/reset',
    },
    posts: {
        search: '/posts',
        new: '/new',
        single: (id: string | number): string => `/posts/${id}`,
    },
};

export default routes;
