import { Application } from 'express';
import request, { SuperTest, Test } from 'supertest';
import houseRentApp from '../../app';
import { deleteTestPost, deleteTestUser, getInfoTestUser, loginTestUser, registerTestUser } from '../../tests/utils';
import { User, UserRole } from '../users/users.entity';
import { mockNewPostBody } from '../../tests/mock';

describe('Test post service', () => {
    let app: Application;
    let api: SuperTest<Test>;
    let token: string;
    let postId: number;
    let user: User;

    beforeAll(async () => {
        app = await houseRentApp.run();
        api = request(app);

        await registerTestUser(api);
        token = await loginTestUser(api);
        user = await getInfoTestUser(api, token);
    });

    afterAll(async () => {
        await deleteTestPost();
        await deleteTestUser();
    });

    describe('create', () => {
        it('create post forbidden 403', async () => {
            await api.post(`/api/v1/users/${user.id}/role`).send({ role: UserRole.REALTOR });
            const res = await api
                .post('/api/v1/posts')
                .send(mockNewPostBody)
                .set('Authorization', 'Bearer ' + token);

            expect(res.statusCode).toEqual(403);
            expect(res.body.massage).toEqual('to create a post user role should be "USER"');
        });

        it('create post success', async () => {
            await api.post(`/api/v1/users/${user.id}/role`).send({ role: UserRole.USER });

            const res = await api
                .post('/api/v1/posts')
                .send(mockNewPostBody)
                .set('Authorization', 'Bearer ' + token);

            postId = res.body.id;
            expect(res.statusCode).toEqual(201);
            expect(res.body.id).toBeTruthy();
            expect(res.body.title).toEqual('test');
            expect(res.body.description).toEqual('test description');
        });

        it('invalid district', async () => {
            await api.post(`/api/v1/users/${user.id}/role`).send({ role: 'user' });

            const res = await api
                .post('/api/v1/posts')
                .send({
                    ...mockNewPostBody,
                    cityFilters: 'lviv',
                    districtFilters: ['obolonskyi'], // 'obolonskyi' district does not exist in 'lviv'
                })
                .set('Authorization', 'Bearer ' + token);

            expect(res.statusCode).toEqual(400);
            expect(res.body.massage).toEqual('invalid district values');
        });

        it('create post not auth', async () => {
            const res = await api.post('/api/v1/posts').send(mockNewPostBody);
            expect(res.statusCode).toEqual(401);
            expect(res.body.massage).toEqual('no token provided');
        });
    });

    describe('get all posts', () => {
        it('get all posts with pagination', async () => {
            const res = await api.get('/api/v1/posts');

            expect(res.statusCode).toEqual(200);
            expect(res.body.currentPage).toEqual(1);
            expect(res.body.totalPages).toEqual(1);
            expect(res.body.totalItems).toEqual(1);
            expect(res.body.data[0].title).toEqual('test');
            expect(res.body.data[0].description).toEqual('test description');
            expect(res.body.data[0].favorite).toEqual(0);
            expect(res.body.data[0].chats).toEqual(0);
            expect(res.body.data[0].views).toEqual(0);
            expect(res.body.data[0].user.firstName).toEqual('Name');
            expect(res.body.data[0].user.lastName).toEqual('LastName');
            expect(res.body.data[0].user.email).toEqual('test@mail.ru');
        });

        it('get all posts with pagination params', async () => {
            const res = await api.get('/api/v1/posts?page=10000');
            expect(res.statusCode).toEqual(200);
            expect(res.body.currentPage).toEqual(10000);
            expect(res.body.totalPages).toEqual(1);
            expect(res.body.totalItems).toEqual(1);
            expect(res.body.data.length).toEqual(0);
        });
    });

    describe('get single post', () => {
        it('get post success', async () => {
            const res = await api.get(`/api/v1/posts/${postId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.title).toEqual('test');
            expect(res.body.description).toEqual('test description');
            expect(res.body.favorite).toEqual(0);
            expect(res.body.chats).toEqual(0);
            expect(res.body.user.firstName).toEqual('Name');
            expect(res.body.user.lastName).toEqual('LastName');
            expect(res.body.user.email).toEqual('test@mail.ru');
        });

        it('post not exist', async () => {
            const res = await api.get('/api/v1/posts/100500');
            expect(res.statusCode).toEqual(404);
            expect(res.body.massage).toEqual('post with this id do not exist');
        });
    });
});
