import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { mediaConfig } from 'src/config/media.config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MediaService {
    async uploadPublicFile(dataBuffer: Buffer): Promise<S3.ManagedUpload.SendData> {
        const s3 = new S3();
        return await s3
            .upload({
                Bucket: mediaConfig.s3UploadBucket,
                Body: dataBuffer,
                Key: `IMG-${uuid()}`,
            })
            .promise();
    }
}
