import { Request, Response } from 'express';
import { validate } from 'class-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import ErrorNormalize from '../../utils/errorNormalize';
import errorWrapper from '../../utils/errorWrapper';
import { User, UserRole } from '../users/entity/users.entity';
import authConfig from '../../config/auth.config';
import database from '../../database';
import { passwordValidate } from './auth.validate';
import { AuthLogin } from './dto/login.dto';

export const joinController = errorWrapper(async (req: Request, res: Response): Promise<void> => {
    const repository = database.connection.getRepository(User);

    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password, authConfig.saltRounds);
    user.role = [UserRole.USER];

    const errors = await validate(user);
    if (errors.length) throw new ErrorNormalize(400, Object.values(errors[0].constraints)[0]);

    const passwordError = passwordValidate(req.body.password);
    if (passwordError) throw new ErrorNormalize(400, passwordError);

    await repository.save(user).catch(error => {
        throw new ErrorNormalize(400, error);
    });
    res.status(204).send();
});

export const loginController = errorWrapper(async (req: Request, res: Response): Promise<void> => {
    const token = req.get('Authorization');
    if (token) throw new ErrorNormalize(401, 'user already authorized');

    const repository = database.connection.getRepository(User);
    const loginCredentials = new AuthLogin();
    loginCredentials.email = req.body.email;
    loginCredentials.password = req.body.password;

    const errors = await validate(loginCredentials);
    if (errors.length) throw new ErrorNormalize(401, Object.values(errors[0].constraints)[0]);

    const user = await repository.findOne({ email: req.body.email }, { select: ['id', 'password'] });
    if (!user) throw new ErrorNormalize(401, 'wrong email or password');

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) throw new ErrorNormalize(401, 'wrong email or password');

    const oneMonthInMS = 30 * 24 * 60 * 60 * 1000;
    const accessToken = jwt.sign({ id: user.id, exp: Date.now() + oneMonthInMS }, authConfig.accessKey);
    res.status(201).json({ accessToken });
});
