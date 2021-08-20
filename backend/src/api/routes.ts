import { Application } from 'express';

import auth from './auth/auth.router';
import users from './users/users.router';
import posts from './posts/posts.router';

const appRoutes = async (app: Application): Promise<void> => {
    app.use('/auth', auth);
    app.use('/users', users);
    app.use('/posts', posts);
};

export default appRoutes;
