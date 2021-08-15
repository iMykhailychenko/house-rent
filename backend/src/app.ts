import express, { Application } from 'express';

import config from './config/app.config';

import database from './database';
import appRoutes from './api/routes';
import appMiddlewares from './middleware/root.middleware';

class App {
    public instance: Application = null;

    run = async (): Promise<Application> => {
        const app = express();

        try {
            await database.connect();
            await appMiddlewares(app);
            await appRoutes(app);

            if (process.env.NODE_ENV !== 'test') {
                app.listen(config.port, config.host, () => {
                    console.log(`App run on port: ${config.port} and host: ${config.host}`);
                });
            }

            this.instance = app;
            return app;
        } catch (error) {
            await database.disconnect();
            console.log(`Server error: ${error}`);
        }
    };
}

const houseRentApp = new App();
houseRentApp.run().catch(error => console.log(error));

export default houseRentApp;
