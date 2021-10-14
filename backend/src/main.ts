import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import appConfig from './config/app.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: true,
    });
    app.setGlobalPrefix('api/v1');
    await app.listen(appConfig.port, appConfig.host, () =>
        console.log(`Backend is running on port ${appConfig.port} and host ${appConfig.host}`),
    );
}

bootstrap().catch(() => console.log('Init error'));
