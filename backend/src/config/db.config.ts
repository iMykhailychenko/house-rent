const dbConfig = {
    database: process.env.DATABASE,
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
};

export default dbConfig;
