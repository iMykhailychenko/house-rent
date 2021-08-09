const endpointsMap = {
    production: {
        ssr: {
            auth: {
                join: 'http://localhost:8000/auth/join',
                login: 'http://localhost:8000/auth/login',
            },
        },
        browser: {
            auth: {
                join: 'http://localhost:8000/auth/join',
                login: 'http://localhost:8000/auth/login',
            },
        },
    },

    development: {
        ssr: {
            auth: {
                join: 'http://localhost:8000/auth/join',
                login: 'http://localhost:8000/auth/login',
            },
        },
        browser: {
            auth: {
                join: 'http://localhost:8000/auth/join',
                login: 'http://localhost:8000/auth/login',
            },
        },
    },

    test: {
        ssr: {
            auth: {
                join: 'http://localhost:8000/auth/join',
                login: 'http://localhost:8000/auth/login',
            },
        },
        browser: {
            auth: {
                join: 'http://localhost:8000/auth/join',
                login: 'http://localhost:8000/auth/login',
            },
        },
    },
};

const endpoints = process.env.browser ? endpointsMap[process.env.NODE_ENV].browser : endpointsMap[process.env.NODE_ENV].ssr;

export default endpoints;
