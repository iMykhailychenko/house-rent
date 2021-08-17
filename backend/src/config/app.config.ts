const config = {
    port: +process.env.BACKEND_PORT || 8000,
    host: process.env.BACKEND_HOST || '0.0.0.0',
};

export default config;
