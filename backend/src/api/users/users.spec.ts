import { Application } from 'express';
import request, { SuperTest, Test } from 'supertest';

import houseRentApp from '../../app';
import { deleteTestUser, loginTestUser, registerTestUser } from '../../tests/utils';

describe('Test user service', () => {
    let app: Application;
    let api: SuperTest<Test>;
    let token: string;
    let userId: string;

    beforeAll(async () => {
        app = await houseRentApp.run();
        api = request(app);
        await registerTestUser(api);
        token = await loginTestUser(api);
    });

    afterAll(async () => {
        await deleteTestUser();
    });

    describe('get all users', () => {
        it('get all users with pagination', async () => {
            const res = await api.get('/users');
            expect(res.statusCode).toEqual(200);
            expect(res.body.currentPage).toEqual(1);
            expect(res.body.totalPages).toEqual(1);
            expect(res.body.totalItems).toEqual(1);
            expect(res.body.data[0].firstName).toEqual('Name');
            expect(res.body.data[0].lastName).toEqual('LastName');
            expect(res.body.data[0].email).toEqual('test@mail.ru');
        });

        it('get all users with pagination params', async () => {
            const res = await api.get('/users?page=10000');
            expect(res.statusCode).toEqual(200);
            expect(res.body.currentPage).toEqual(10000);
            expect(res.body.totalPages).toEqual(1);
            expect(res.body.totalItems).toEqual(1);
            expect(res.body.data.length).toEqual(0);
        });
    });

    describe('get profile info', () => {
        it('success', async () => {
            const res = await api.get('/users/profile').set('Authorization', 'Bearer ' + token);
            userId = res.body.id;
            expect(res.statusCode).toEqual(200);
            expect(res.body.firstName).toEqual('Name');
            expect(res.body.lastName).toEqual('LastName');
            expect(res.body.email).toEqual('test@mail.ru');
        });

        it('not authorized', async () => {
            const res = await api.get('/users/profile');
            expect(res.statusCode).toEqual(401);
            expect(res.body.massage).toEqual('no token provided');
        });
    });

    describe('get user by id', () => {
        it('success', async () => {
            const res = await api.get(`/users/${userId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.firstName).toEqual('Name');
            expect(res.body.lastName).toEqual('LastName');
            expect(res.body.email).toEqual('test@mail.ru');
        });

        it('not authorized', async () => {
            const res = await api.get('/users/100500');
            expect(res.statusCode).toEqual(404);
            expect(res.body.massage).toEqual('user with this id do not exist');
        });
    });
});
