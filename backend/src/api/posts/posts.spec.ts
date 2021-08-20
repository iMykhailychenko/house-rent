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

    it('Get all posts with pagination', async () => {
        const res = await api.get('/posts');

        expect(res.statusCode).toEqual(200);

        expect(res.body.currentPage).toEqual(1);
        expect(res.body.totalPages).toEqual(0);
        expect(res.body.totalPosts).toEqual(1);
        expect(res.body.data[0].title).toEqual('test');
        expect(res.body.data[0].description).toEqual('test description');
        expect(res.body.data[0].user.firstName).toEqual('Name');
        expect(res.body.data[0].user.lastName).toEqual('LastName');
        expect(res.body.data[0].user.email).toEqual('test@mail.ru');
    });

    it('Get all posts with pagination params', async () => {
        const res = await api.get('/posts?page=10000');

        expect(res.statusCode).toEqual(200);

        expect(res.body.currentPage).toEqual(10000);
        expect(res.body.totalPages).toEqual(0);
        expect(res.body.totalPosts).toEqual(1);
        expect(res.body.data.length).toEqual(0);
    });
});
