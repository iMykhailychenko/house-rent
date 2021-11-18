import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { appConfig } from './config/app.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: true,
        cors: true,
    });
    app.setGlobalPrefix('api/v1');
    app.use(morgan('common'));
    await app.listen(appConfig.port, appConfig.host, () =>
        console.log(`Backend is running on port ${appConfig.port} and host ${appConfig.host}`),
    );
}

bootstrap().catch(() => console.log('error while initializing app'));
