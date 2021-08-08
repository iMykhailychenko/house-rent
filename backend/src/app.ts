import express from 'express';

import config from './config/app.config';

import connectToDb from './database';
import appRoutes from './api/routes';
import appMiddlewares from './middlewares';

const bootstrap = async (): Promise<void> => {
    try {
        const app = express();
        await connectToDb();
        await appMiddlewares(app);
        await appRoutes(app);

        // run server
        app.listen(config.port, config.host, () => {
            console.log(`App run on port: ${config.port} and host: ${config.host}`);
        });
    } catch (error) {
        console.log(`Server error: ${error}`);
    }
};

bootstrap().catch(error => console.log(error));
