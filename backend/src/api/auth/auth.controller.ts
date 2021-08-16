import { Request, Response } from 'express';
import { validate } from 'class-validator';

import { AuthJoin } from './dto/join.dto';
import ErrorNormalize from '../../utils/errorNormalize';
import errorWrapper from '../../utils/errorWrapper';

export const joinController = errorWrapper(async (req: Request, res: Response): Promise<void> => {
    const credentials = new AuthJoin();
    credentials.firstName = req.body.firstName;
    credentials.lastName = req.body.lastName;
    credentials.password = req.body.password;
    credentials.email = req.body.email;
    credentials.role = req.body.role;

    const errors = await validate(credentials);
    if (errors.length) throw new ErrorNormalize(400, Object.values(errors[0].constraints)[0]);

    res.status(204).send();
});

export const loginController = async (req: Request, res: Response): Promise<void> => {
    res.send('login');
};
