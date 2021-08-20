import errorWrapper from '../utils/errorWrapper';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import ErrorNormalize from '../utils/errorNormalize';
import authConfig from '../config/auth.config';
import { User } from '../api/users/entity/users.entity';
import database from '../database';

const auth = errorWrapper(async (req: Request & { user: User }, _: Response, next: NextFunction) => {
    const token = req.get('Authorization') && req.get('Authorization').replace('Bearer ', '');
    if (!token) throw new ErrorNormalize(401, 'no token provided');

    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(token, authConfig.accessKey) as JwtPayload;
    } catch (error) {
        throw new ErrorNormalize(401, 'invalid token provided');
    }
    if (!decoded?.id) throw new ErrorNormalize(401, 'invalid token provided');
    if (+decoded.exp < Date.now()) throw new ErrorNormalize(401, 'token is outdated');

    const repository = database.connection.getRepository(User);
    const user = await repository.findOne({ id: decoded.id }).catch(() => {
        throw new ErrorNormalize(401, 'not authorized');
    });
    if (!user) throw new ErrorNormalize(401, 'not authorized');
    user.lastActivity = new Date();
    await repository.save(user);

    req.user = user;
    return next();
});

export default auth;
