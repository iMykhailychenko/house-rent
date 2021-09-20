import express, { Application, Request, Response } from 'express';
import request, { SuperTest, Test } from 'supertest';
import jwt from 'jsonwebtoken';

import houseRentApp from '../app';
import { deleteTestUser, loginTestUser, registerTestUser } from '../tests/utils';
import auth from './auth.middleware';
import authConfig from '../config/auth.config';

describe('Test post service', () => {
    let app: Application;
    let api: SuperTest<Test>;
    let token: string;

    beforeAll(async () => {
        app = await houseRentApp.run();

        const router = express.Router();
        router.get('/', auth, (req: Request, res: Response) => {
            res.send('success');
        });
        app.use('/test', router);

        api = request(app);
        await registerTestUser(api);
        token = await loginTestUser(api);
    });

    afterAll(async () => {
        await deleteTestUser();
    });

    it('success', async () => {
        const res = await api.get('/test').set('Authorization', 'Bearer ' + token);
        expect(res.statusCode).toEqual(200);
    });

    it('no token provided', async () => {
        const res = await api.get('/test');
        expect(res.statusCode).toEqual(401);
        expect(res.body.massage).toEqual('no token provided');
    });

    it('token is outdated', async () => {
        const outdatedToken = jwt.sign({ id: 1, exp: Date.now() - 10 }, authConfig.accessKey);
        const res = await api.get('/test').set('Authorization', 'Bearer ' + outdatedToken);
        expect(res.statusCode).toEqual(401);
        expect(res.body.massage).toEqual('token is outdated');
    });

    it('invalid token provided', async () => {
        const res = await api.get('/test').set('Authorization', 'Bearer 1111');
        expect(res.statusCode).toEqual(401);
        expect(res.body.massage).toEqual('invalid token provided');
    });

    it('invalid user id in token provided', async () => {
        const invalidToken = jwt.sign({ id: 'test', exp: Date.now() + 100000 }, authConfig.accessKey);
        const res = await api.get('/test').set('Authorization', 'Bearer ' + invalidToken);
        expect(res.statusCode).toEqual(401);
        expect(res.body.massage).toEqual('not authorized');
    });
});
