import { Application } from 'express';
import request, { SuperTest, Test } from 'supertest';
import houseRentApp from '../../app';
import { deleteTestPost, deleteTestUser, loginTestUser, registerTestUser } from '../../tests/utils';

describe('Test post service', () => {
    let app: Application;
    let api: SuperTest<Test>;
    let token: string;

    beforeAll(async () => {
        app = await houseRentApp.run();
        api = request(app);
        await registerTestUser(api);
        token = await loginTestUser(api);
    });

    afterAll(async () => {
        await deleteTestPost();
        await deleteTestUser();
    });

    it('create post success', async () => {
        const res = await api
            .post('/posts')
            .send({
                title: 'test',
                description: 'test description',
            })
            .set('Authorization', 'Bearer ' + token);

        expect(res.statusCode).toEqual(204);
    });

    it('create post not auth', async () => {
        const res = await api.post('/posts').send({
            title: 'test',
            description: 'test description',
        });

        expect(res.statusCode).toEqual(401);
        expect(res.body.massage).toEqual('no token provided');
    });
});
