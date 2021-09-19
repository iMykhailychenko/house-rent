import { Application } from 'express';
import request, { SuperTest, Test } from 'supertest';
import houseRentApp from '../../app';
import { deleteTestUser, loginTestUser, registerTestUser } from '../../tests/utils';
import path from 'path';
import * as fs from 'fs';

describe('Test media', () => {
    let app: Application;
    let api: SuperTest<Test>;
    let token: string;
    let uploadedFileName: string;

    const fileName = 'test.txt';
    const filePath = path.join(process.cwd(), fileName);
    const mediaFilesDir = path.join(process.cwd(), 'uploads');

    beforeAll(async () => {
        app = await houseRentApp.run();
        api = request(app);

        await registerTestUser(api);
        token = await loginTestUser(api);
    });

    afterAll(async () => {
        await deleteTestUser();
        await fs.promises.unlink(path.join(mediaFilesDir, uploadedFileName));
        await fs.promises.unlink(filePath);
    });

    it('Upload file', async () => {
        // check if uploads dir is empty
        await fs.promises.readdir(mediaFilesDir);
        // create test file in root
        await fs.promises.writeFile(filePath, 'test');

        // test api
        const res = await api
            .post('/api/v1/media')
            .set('content-type', 'multipart/form-data')
            .set('Authorization', 'Bearer ' + token)
            .attach('image', fs.readFileSync(filePath), fileName);

        uploadedFileName = res.body.url.replace('http://localhost:8000/media/', '');

        expect(res.body.url).toBeTruthy();
        expect(res.body.url.includes('http://localhost:8000/media/IMG_')).toBeTruthy();
        expect(res.body.url.includes(fileName)).toBeTruthy();
    });
});
