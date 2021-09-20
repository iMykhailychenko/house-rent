import { User } from '../api/users/users.entity';
import { Post } from '../api/posts/posts.entity';
import { SuperTest, Test } from 'supertest';
import database from '../database';
import { joinMock, loginMock, mockNewPostBody } from './mock';

export const registerTestUser = async (api: SuperTest<Test>): Promise<void> => {
    await api.post('/api/v1/auth/join').send(joinMock);
};

export const loginTestUser = async (api: SuperTest<Test>): Promise<string> => {
    const res = await api.post('/api/v1/auth/login').send(loginMock);
    return res.body.accessToken;
};

export const getInfoTestUser = async (api: SuperTest<Test>, token: string): Promise<User> => {
    const res = await api.get('/api/v1/users/profile').set('Authorization', token);
    return res.body;
};

export const createTestPost = async (api: SuperTest<Test>, token: string): Promise<Post> => {
    const res = await api
        .post('/api/v1/posts')
        .send(mockNewPostBody)
        .set('Authorization', 'Bearer ' + token);
    return res.body;
};

export const addToFavorite = async (api: SuperTest<Test>, token: string, postId: number): Promise<void> => {
    await api.post(`/api/v1/favorite/${postId}`).set('Authorization', 'Bearer ' + token);
};

export const deleteFromFavorite = async (api: SuperTest<Test>, token: string, postId: number): Promise<void> => {
    await api.delete(`/api/v1/favorite/${postId}`).set('Authorization', 'Bearer ' + token);
};

export const deleteTestUser = async (): Promise<void> => {
    const repository = database.connection.getRepository(User);
    const user = await repository.findOne({ email: 'test@mail.ru' });
    await repository.remove(user);
};

export const deleteTestPost = async (): Promise<void> => {
    const repository = database.connection.getRepository(Post);
    const user = await repository.findOne({ title: 'test' });
    await repository.remove(user);
};
