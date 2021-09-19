import { Application } from 'express';
import request, { SuperTest, Test } from 'supertest';

import houseRentApp from '../../app';
import { deleteTestUser } from '../../tests/utils';
import { joinMock, loginMock } from '../../tests/mock';

describe('Test auth service', () => {
    let app: Application;
    let api: SuperTest<Test>;

    beforeAll(async () => {
        app = await houseRentApp.run();
        api = request(app);
    });

    afterAll(async () => {
        await deleteTestUser();
    });

    describe('Join', () => {
        it('Join success', async () => {
            const res = await api.post('/api/v1/auth/join').send(joinMock);
            expect(res.statusCode).toEqual(204);
        });

        it('Join success duplicate', async () => {
            const res = await api.post('/api/v1/auth/join').send(joinMock);
            expect(res.statusCode).toEqual(400);
            expect(res.body.massage.includes('duplicate key value violates unique constraint')).toBeTruthy();
        });

        it('Invalid firstName', async () => {
            const res = await api.post('/api/v1/auth/join').send({
                ...joinMock,
                firstName: 1,
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toStrictEqual({
                massage: 'firstName must be longer than or equal to 1 and shorter than or equal to 50 characters',
            });
        });

        it('Invalid property', async () => {
            const res = await api.post('/api/v1/auth/join').send({
                firstName: 'Name',
                lastName: 'LastName',
                email_email: 'test@mail.ru',
                password: 'P@ssw0rd!',
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toStrictEqual({
                massage: 'email must be an email',
            });
        });

        it('Invalid password', async () => {
            const res = await api.post('/api/v1/auth/join').send({
                ...joinMock,
                password: 'P',
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toStrictEqual({
                massage: 'password must be longer than or equal to 6 and shorter than or equal to 30 characters',
            });
        });
    });

    describe('Login', () => {
        it('Login success', async () => {
            const res = await api.post('/api/v1/auth/login').send(loginMock);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('accessToken');
        });

        it('Login - already authorized', async () => {
            const res = await api.post('/api/v1/auth/login').send(loginMock).set('Authorization', 'test');
            expect(res.statusCode).toEqual(401);
            expect(res.body).not.toHaveProperty('accessToken');
            expect(res.body).toStrictEqual({
                massage: 'user already authorized',
            });
        });

        it('Login error - wrong password', async () => {
            const res = await api.post('/api/v1/auth/login').send({
                ...loginMock,
                password: 'wrong_password',
            });
            expect(res.statusCode).toEqual(401);
            expect(res.body).not.toHaveProperty('accessToken');
            expect(res.body).toStrictEqual({
                massage: 'wrong email or password',
            });
        });

        it('Login error - wrong email', async () => {
            const res = await api.post('/api/v1/auth/login').send({
                ...loginMock,
                email: 'wrong_test@mail.ru',
            });
            expect(res.statusCode).toEqual(401);
            expect(res.body).not.toHaveProperty('accessToken');
            expect(res.body).toStrictEqual({
                massage: 'wrong email or password',
            });
        });

        it('Login error - invalid credentials', async () => {
            const res = await api.post('/api/v1/auth/login').send({
                ...loginMock,
                password: null,
            });
            expect(res.statusCode).toEqual(401);
            expect(res.body).not.toHaveProperty('accessToken');
            expect(res.body).toStrictEqual({
                massage: 'password must be longer than or equal to 6 characters',
            });
        });

        it('Login error - invalid credentials', async () => {
            const res = await api.post('/api/v1/auth/login').send({
                test_email: 'test@mail.ru',
                password: 'P@ssw0rd!',
            });
            expect(res.statusCode).toEqual(401);
            expect(res.body).not.toHaveProperty('accessToken');
            expect(res.body).toStrictEqual({
                massage: 'email must be an email',
            });
        });
    });
});
