import request from 'supertest';
import { app } from '../../app';

describe('Test auth service', () => {
    describe('Login', () => {
        it('Login success', async () => {
            const res = await request(app).post('/auth/login').send({
                email: 'fff@mail.ru',
                password: 'P@ssw0rd!',
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('accessToken');
        });

        it('Login error - invalid credentials', async () => {
            const res = await request(app).post('/auth/login').send({
                useName: 'fff@mail.ru',
                password: null,
            });
            console.dir(res);
            expect(res.statusCode).toEqual(400);
            expect(res.body).not.toHaveProperty('accessToken');
        });
    });

    describe('Join', () => {
        it('Join success', async () => {
            const res = await request(app).post('/auth/join').send({
                firstName: 'Name',
                lastName: 'LastName',
                email: 'fff@mail.ru',
                password: 'P@ssw0rd!',
            });
            expect(res.statusCode).toEqual(204);
        });

        describe('Join error - invalid credentials', () => {
            it('Invalid firstName', async () => {
                const res = await request(app).post('/auth/login').send({
                    firstName: 1,
                    lastName: 'LastName',
                    email: 'fff@mail.ru',
                    password: 'P@ssw0rd!',
                });
                console.dir(res);
                expect(res.statusCode).toEqual(400);
            });

            it('Invalid property', async () => {
                const res = await request(app).post('/auth/login').send({
                    firstName: 'Name',
                    lastName: 'LastName',
                    email_email: 'fff@mail.ru',
                    password: 'P@ssw0rd!',
                });
                console.dir(res);
                expect(res.statusCode).toEqual(400);
            });

            it('Invalid password', async () => {
                const res = await request(app).post('/auth/login').send({
                    firstName: 'Name',
                    lastName: 'LastName',
                    email: 'fff@mail.ru',
                    password: 'P',
                });
                console.dir(res);
                expect(res.statusCode).toEqual(400);
            });
        });
    });
});
