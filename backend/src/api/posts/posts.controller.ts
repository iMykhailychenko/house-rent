import { Request, Response } from 'express';
import { validate } from 'class-validator';

import errorWrapper from '../../utils/errorWrapper';
import database from '../../database';
import { Post } from './entity/posts.entity';
import { User, UserRole } from '../users/entity/users.entity';
import ErrorNormalize from '../../utils/errorNormalize';

export const postsListController = errorWrapper(async (req: Request, res: Response): Promise<void> => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 20;

    const repository = database.connection.getRepository(Post);
    const [result, total] = await repository.findAndCount({
        relations: ['user'],
        take: limit,
        skip: limit * (page - 1),
    });

    res.json({
        totalPosts: total,
        totalPages: Math.ceil(total / limit) - 1,
        currentPage: +page,
        data: result,
    });
});

export const singlePostController = errorWrapper(async (req: Request & { user: User }, res: Response): Promise<void> => {
    const repository = database.connection.getRepository(Post);
    const post = await repository.findOne({ id: +req.params.postId }, { relations: ['user'] }).catch(error => {
        throw new ErrorNormalize(404, error);
    });

    if (!post) throw new ErrorNormalize(404, 'post with this id do not exist');

    res.json(post);
});

export const createPostController = errorWrapper(async (req: Request & { user: User }, res: Response): Promise<void> => {
    const post = new Post();
    post.title = req.body.title;
    post.description = req.body.description;
    post.generalFilters = req.body.generalFilters;
    post.roomFilters = req.body.roomFilters;
    post.houseTypeFilters = req.body.houseTypeFilters;
    post.priceFilters = req.body.priceFilters;
    post.cityFilters = req.body.cityFilters;
    post.districtFilters = req.body.districtFilters;
    post.user = req.user;

    const errors = await validate(post);
    if (errors.length) throw new ErrorNormalize(400, Object.values(errors[0].constraints)[0]);
    if (!req.user?.role?.includes(UserRole.USER)) throw new ErrorNormalize(403, 'to create a post user role should be "USER"');

    const repository = database.connection.getRepository(Post);
    await repository.save(post).catch(error => {
        throw new ErrorNormalize(400, error);
    });

    res.json(post);
});
