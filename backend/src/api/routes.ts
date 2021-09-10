import { Application, Router } from 'express';

import auth from './auth/auth.router';
import users from './users/users.router';
import posts from './posts/posts.router';
import media from './media/media.router';

const appRoutes = async (app: Application): Promise<void> => {
    const router = Router();
    router.use('/auth', auth);
    router.use('/users', users);
    router.use('/posts', posts);
    router.use('/media', media);

    app.use('/api/v1', router);
};

export default appRoutes;
