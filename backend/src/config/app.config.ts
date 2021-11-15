const appConfig = {
    port: +process.env.BACKEND_PORT || 8000,
    host: process.env.BACKEND_HOST || '0.0.0.0',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
};

export default appConfig;
