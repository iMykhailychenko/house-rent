const routes = {
    home: '/',
    auth: {
        login: '/auth/login',
        join: '/auth/join',
        success: '/auth/join/success',
    },
    posts: {
        search: '/posts',
        new: '/new',
        single: (id: string | number): string => `/posts/${id}`,
    },
};

export default routes;
