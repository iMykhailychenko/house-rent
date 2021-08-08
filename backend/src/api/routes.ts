import { Application } from 'express';

import auth from './auth/auth.router';
import users from './users/users.router';

const appRoutes = async (app: Application): Promise<void> => {
    app.use('/auth', auth);
    app.use('/users', users);
};

export default appRoutes;
