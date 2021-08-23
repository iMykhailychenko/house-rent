const endpointsMap = {
    development() {
        return {
            ssr: {
                auth: {
                    join: 'http://backend:8000/auth/join',
                    login: 'http://backend:8000/auth/login',
                },
                profile: {
                    getUserInfo: 'http://backend:8000/users/profile',
                },
            },
            browser: {
                auth: {
                    join: 'http://localhost:8000/auth/join',
                    login: 'http://localhost:8000/auth/login',
                },
                profile: {
                    getUserInfo: 'http://localhost:8000/users/profile',
                },
            },
        };
    },

    production() {
        return this.development();
    },

    test() {
        return this.development();
    },
};

endpointsMap.test = endpointsMap.development;

const endpoints =
    typeof window !== 'undefined' ? endpointsMap[process.env.NODE_ENV]().browser : endpointsMap[process.env.NODE_ENV]().ssr;

export default endpoints;
