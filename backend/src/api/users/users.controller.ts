import { Request, Response } from 'express';

import database from '../../database';
import { User } from './entity/users.entity';
import errorWrapper from '../../utils/errorWrapper';

export const usersListController = errorWrapper(async (req: Request, res: Response): Promise<void> => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 20;

    const repository = database.connection.getRepository(User);
    const [result, total] = await repository.findAndCount({
        select: ['id', 'creationDate', 'lastActivity', 'firstName', 'lastName', 'email', 'role'],
        take: limit,
        skip: limit * (page - 1),
    });

    res.json({
        totalUsers: total,
        totalPages: Math.ceil(total / limit) - 1,
        currentPage: +page,
        data: result,
    });
});
