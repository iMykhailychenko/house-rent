import { Application } from 'express';
import request, { SuperTest, Test } from 'supertest';
import houseRentApp from '../../app';
import { createTestPost, deleteTestPost, deleteTestUser, loginTestUser, registerTestUser } from '../../tests/utils';
import { Post } from '../posts/posts.entity';

describe('Test media', () => {
    let app: Application;
    let api: SuperTest<Test>;
    let token: string;
    let post: Post;

    beforeAll(async () => {
        app = await houseRentApp.run();
        api = request(app);

        await registerTestUser(api);
        token = await loginTestUser(api);
        post = await createTestPost(api, token);
    });

    afterAll(async () => {
        await deleteTestUser();
        await deleteTestPost();
    });

    it('Add post to favorite', async () => {
        const res = await api.post(`/api/v1/favorite/${post.id}`).set('Authorization', 'Bearer ' + token);
        expect(res.statusCode).toEqual(204);
    });
});
