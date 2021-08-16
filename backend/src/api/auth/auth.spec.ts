import request, { SuperTest, Test } from 'supertest';
import houseRentApp from '../../app';
import { Application } from 'express';
import { UserRole } from '../users/entity/users.entity';

describe('Test auth service', () => {
    let app: Application;
    let api: SuperTest<Test>;

    beforeAll(async () => {
        app = await houseRentApp.run();
        api = request(app);
    });

    // describe('Login', () => {
    //     it('Login success', async () => {
    //         const res = await api.post('/auth/login').send({
    //             email: 'fff@mail.ru',
    //             password: 'P@ssw0rd!',
    //         });
    //         expect(res.statusCode).toEqual(201);
    //         expect(res.body).toHaveProperty('accessToken');
    //     });
    //
    //     it('Login error - invalid credentials', async () => {
    //         const res = await api.post('/auth/login').send({
    //             useName: 'fff@mail.ru',
    //             password: null,
    //         });
    //         console.dir(res);
    //         expect(res.statusCode).toEqual(400);
    //         expect(res.body).not.toHaveProperty('accessToken');
    //     });
    // });

    describe('Join', () => {
        it('Join success', async () => {
            const res = await api.post('/auth/join').send({
                firstName: 'Name',
                lastName: 'LastName',
                email: 'fff@mail.ru',
                password: 'P@ssw0rd!',
                role: UserRole.USER,
            });
            expect(res.statusCode).toEqual(204);
        });

        it('Invalid firstName', async () => {
            const res = await api.post('/auth/join').send({
                firstName: 1,
                lastName: 'LastName',
                email: 'fff@mail.ru',
                password: 'P@ssw0rd!',
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toStrictEqual({
                massage: 'firstName must be longer than or equal to 1 and shorter than or equal to 40 characters',
            });
        });

        it('Invalid property', async () => {
            const res = await api.post('/auth/join').send({
                firstName: 'Name',
                lastName: 'LastName',
                email_email: 'fff@mail.ru',
                password: 'P@ssw0rd!',
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toStrictEqual({
                massage: 'email must be an email',
            });
        });

        it('Invalid password', async () => {
            const res = await api.post('/auth/join').send({
                firstName: 'Name',
                lastName: 'LastName',
                email: 'fff@mail.ru',
                password: 'P',
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toStrictEqual({
                massage: 'password must be longer than or equal to 6 characters',
            });
        });
    });
});
