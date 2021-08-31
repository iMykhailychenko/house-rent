import { Application } from 'express';

import auth from './auth/auth.router';
import users from './users/users.router';
import posts from './posts/posts.router';
import media from './media/media.router';

const appRoutes = async (app: Application): Promise<void> => {
    app.use('/auth', auth);
    app.use('/users', users);
    app.use('/posts', posts);
    app.use('/media', media);
};

export default appRoutes;
