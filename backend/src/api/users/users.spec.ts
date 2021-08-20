import { Application } from 'express';
import request, { SuperTest, Test } from 'supertest';

import houseRentApp from '../../app';
import { deleteTestUser, registerTestUser } from '../../tests/utils';

describe('Test user service', () => {
    let app: Application;
    let api: SuperTest<Test>;

    beforeAll(async () => {
        app = await houseRentApp.run();
        api = request(app);
        await registerTestUser(api);
    });

    afterAll(async () => {
        await deleteTestUser();
    });

    it('Get all users with pagination', async () => {
        const res = await api.get('/users');

        expect(res.statusCode).toEqual(200);

        expect(res.body.currentPage).toEqual(1);
        expect(res.body.totalPages).toEqual(0);
        expect(res.body.totalUsers).toEqual(1);
        expect(res.body.data[0].firstName).toEqual('Name');
        expect(res.body.data[0].lastName).toEqual('LastName');
        expect(res.body.data[0].email).toEqual('test@mail.ru');
    });

    it('Get all users with pagination params', async () => {
        const res = await api.get('/users?page=10000');

        expect(res.statusCode).toEqual(200);

        expect(res.body.currentPage).toEqual(10000);
        expect(res.body.totalPages).toEqual(0);
        expect(res.body.totalUsers).toEqual(1);
        expect(res.body.data.length).toEqual(0);
    });
});
