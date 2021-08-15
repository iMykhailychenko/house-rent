import { Request, Response } from 'express';
import { AuthJoin } from './dto/join.dto';
import { validate } from 'class-validator';
import ErrorNormalize from '../../utils/errorNormalize';

export const joinController = async (req: Request, res: Response): Promise<void> => {
    const credentials = new AuthJoin();
    credentials.firstName = req.body.firstName;
    credentials.lastName = req.body.lastName;
    credentials.email = req.body.email;
    credentials.password = req.body.password;

    validate(credentials).then(errors => {
        if (errors) throw new ErrorNormalize(400, Object.values(errors[0]?.constraints)?.[0]);
    });

    res.status(204);
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
    res.send('login');
};
