import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import auth from './api/auth/auth.router';

import config from './config/app.config';
import database from './database';

const app = express();

const bootstrap = async (): Promise<void> => {
    try {
        console.log('Connecting to database ...');
        await database.connect();
        console.log('Connected');

        app.use(morgan('common'));
        app.use(cors());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // routes
        app.use('/auth', auth);

        // run server
        app.listen(config.port, config.host, () => {
            console.log(`App run on port: ${config.port} and host: ${config.host}`);
        });
    } catch (error) {
        console.log(`Server error: ${error}`);
    }
};

bootstrap().catch(error => console.log(error));
