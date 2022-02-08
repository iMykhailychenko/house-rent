const env = {
    host: process.env.NEXT_PUBLIC_URL || 'http://localhost:8000',
    backand: process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:8000',
};

export default env;
