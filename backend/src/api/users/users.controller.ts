import { Request, Response } from 'express';

import database from '../../database';
import { User } from './users.entity';
import errorWrapper from '../../utils/errorWrapper';
import ErrorNormalize from '../../utils/errorNormalize';
import errorCatch from '../../utils/errorCatch';
import { Role } from './dto/role.dto';
import { validate } from 'class-validator';

export const usersListController = errorWrapper(async (req: Request, res: Response): Promise<void> => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 20;

    const repository = database.connection.getRepository(User);
    const [result, total] = await repository.findAndCount({
        take: limit,
        skip: limit * (page - 1),
    });

    res.json({
        totalItems: total,
        totalPages: Math.ceil(total / limit) - 1,
        currentPage: +page,
        data: result,
    });
});

export const userProfileController = errorWrapper(async (req: Request & { user: User }, res: Response) => {
    res.json(req.user);
});

export const singleUserController = errorWrapper(async (req: Request, res: Response) => {
    const repository = database.connection.getRepository(User);
    const user = await repository.findOne({ id: +req.params.userId }).catch(errorCatch(400));

    if (!user) throw new ErrorNormalize(404, 'user with this id do not exist');

    res.json(user);
});

export const userRoleController = errorWrapper(async (req: Request, res: Response) => {
    const repository = database.connection.getRepository(User);
    const user = await repository.findOne({ id: +req.params.userId }).catch(error => {
        throw new ErrorNormalize(400, error);
    });
    if (!user) throw new ErrorNormalize(404, 'user with this id do not exist');

    const role = new Role();
    role.role = req.body.role;
    const errors = await validate(role);
    if (errors.length) throw new ErrorNormalize(400, Object.values(errors[0].constraints)[0]);

    user.role = req.body.role;
    await repository.save(user).catch(errorCatch(400));

    res.status(204).send();
});
