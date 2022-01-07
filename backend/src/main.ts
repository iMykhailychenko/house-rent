import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import * as morgan from 'morgan';

import { AppModule } from './app.module';
import { appConfig } from './config/app.config';
import { mediaConfig } from './config/media.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: true,
        cors: true,
    });
    app.setGlobalPrefix('api/v1');
    app.use(morgan('common'));
    config.update({
        accessKeyId: mediaConfig.s3UploadKey,
        secretAccessKey: mediaConfig.s3UploadSecret,
        region: mediaConfig.s3UploadRegion,
    });

    await app.listen(appConfig.port, appConfig.host, () =>
        console.log(`Backend is running on port ${appConfig.port} and host ${appConfig.host}`),
    );
}

bootstrap().catch(() => console.log('error while initializing app'));
