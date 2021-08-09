import errorWrapper from '../utils/errorWrapper';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import ErrorNormalize from '../utils/errorNormalize';
import authConfig from '../config/auth.config';

const auth = errorWrapper(async (req: Request, _: Response, next: NextFunction) => {
    const token = req.get('Authorization') && req.get('Authorization').replace('Bearer ', '');
    if (!token) throw new ErrorNormalize(401, 'No token provided');

    const data = await jwt.verify(token, authConfig.accessKey);
    if (!data) throw new ErrorNormalize(401, 'Not authorized');

    // const user = await UserModel.findById(id);
    // if (!user) throw newError('Not authorized', 401);
    //
    // const currentToken = user.tokens.find(data => data.token === token);
    // if (!currentToken) throw newError('Not authorized', 401);
    //
    // if (new Date() > new Date(currentToken.expires)) {
    //     user.tokens = user.tokens.filter(data => data.token !== token);
    //     await user.save();
    //
    //     throw newError('Token expired', 403);
    // }

    // req.user = user;
    // req.token = token;
    return next();
});

export default auth;
