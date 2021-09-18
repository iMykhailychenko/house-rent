import { User, UserRole } from '../api/users/users.entity';
import { Post } from '../api/posts/posts.entity';
import { SuperTest, Test } from 'supertest';
import database from '../database';

export const registerTestUser = async (api: SuperTest<Test>): Promise<void> => {
    await api.post('/api/v1/auth/join').send({
        firstName: 'Name',
        lastName: 'LastName',
        email: 'test@mail.ru',
        password: 'P@ssw0rd!',
        role: UserRole.USER,
    });
};

export const loginTestUser = async (api: SuperTest<Test>): Promise<string> => {
    const res = await api.post('/api/v1/auth/login').send({
        email: 'test@mail.ru',
        password: 'P@ssw0rd!',
    });
    return res.body.accessToken;
};

export const getInfoTestUser = async (api: SuperTest<Test>, token: string): Promise<User> => {
    const res = await api.get('/api/v1/users/profile').set('Authorization', token);
    return res.body;
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
