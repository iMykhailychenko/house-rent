const routes = {
    home: '/',
    posts: {
        search: '/posts',
        new: '/new',
        single: (id: string | number): string => `/posts/${id}`,
    },
};

export default routes;
