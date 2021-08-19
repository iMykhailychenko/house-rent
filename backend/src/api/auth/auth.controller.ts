import { Request, Response } from 'express';
import { validate } from 'class-validator';
import bcrypt from 'bcrypt';

import ErrorNormalize from '../../utils/errorNormalize';
import errorWrapper from '../../utils/errorWrapper';
import { User } from '../users/entity/users.entity';
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
    user.role = req.body.role;
    user.password = await bcrypt.hash(req.body.password, authConfig.saltRounds);

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
    const repository = database.connection.getRepository(User);

    const loginCredentials = new AuthLogin();
    loginCredentials.email = req.body.email;
    loginCredentials.password = req.body.password;

    const errors = await validate(loginCredentials);
    if (errors.length) throw new ErrorNormalize(400, Object.values(errors[0].constraints)[0]);

    const user = await repository.findOne({ email: req.body.email });
    if (!user) throw new ErrorNormalize(400, 'wrong email or password');

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) throw new ErrorNormalize(400, 'wrong email or password');

    res.status(201).json({ accessToken: 'accessToken' });
});
