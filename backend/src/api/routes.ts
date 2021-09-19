import { Application, Router } from 'express';

import auth from './auth/auth.router';
import users from './users/users.router';
import posts from './posts/posts.router';
import media from './media/media.router';
import favorite from './favorite/favorite.router';

const appRoutes = async (app: Application): Promise<void> => {
    const router = Router();

    // routes
    router.use('/auth', auth);
    router.use('/users', users);
    router.use('/posts', posts);
    router.use('/media', media);
    router.use('/favorite', favorite);

    // prefix
    app.use('/api/v1', router);
};

export default appRoutes;
