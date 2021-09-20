import { Request, Response } from 'express';
import { validate } from 'class-validator';

import errorWrapper from '../../utils/errorWrapper';
import database from '../../database';
import { Post } from './posts.entity';
import { User, UserRole } from '../users/users.entity';
import ErrorNormalize from '../../utils/errorNormalize';
import errorCatch from '../../utils/errorCatch';
import { Favorite } from '../favorite/favorite.entity';

const isPostInFavorite = async (post: Post, user: User): Promise<boolean> => {
    if (!user) return false;
    const repository = database.connection.getRepository(Favorite);
    const favorite = await repository.findOne({ where: { post: post.id, user: user.id } });
    return !!favorite;
};

export const postsListController = errorWrapper(async (req: Request & { user: User }, res: Response): Promise<void> => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 20;

    const repository = database.connection.getRepository(Post);
    const total = await repository.count();
    const result = await repository
        .createQueryBuilder('post')
        .orderBy('post.creationDate', 'DESC')
        .offset(limit * (page - 1))
        .limit(limit)
        .leftJoinAndSelect('post.user', 'user')
        .loadRelationCountAndMap('post.favorite', 'post.favorite')
        .loadRelationCountAndMap('post.chats', 'post.chats')
        .getMany()
        .catch(errorCatch(404));

    for await (const post of result || []) {
        post.isFavorite = await isPostInFavorite(post, req.user);
    }

    res.json({
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: +page,
        data: result,
    });
});

export const singlePostController = errorWrapper(async (req: Request & { user: User }, res: Response): Promise<void> => {
    const repository = database.connection.getRepository(Post);
    const post = await repository
        .createQueryBuilder('post')
        .where({ id: +req.params.postId })
        .leftJoinAndSelect('post.user', 'user')
        .loadRelationCountAndMap('post.favorite', 'post.favorite')
        .loadRelationCountAndMap('post.chats', 'post.chats')
        .getOne()
        .catch(errorCatch(404));

    if (!post) throw new ErrorNormalize(404, 'post with this id do not exist');
    res.json({ ...post, isFavorite: await isPostInFavorite(post, req.user) });
});

export const createPostController = errorWrapper(async (req: Request & { user: User }, res: Response): Promise<void> => {
    const post = new Post();
    post.title = req.body.title;
    post.description = req.body.description;
    post.residentsAmount = +req.body.residentsAmount;
    post.children = req.body.children || null;
    post.pets = req.body.pets || null;
    post.roomFilters = req.body.roomFilters;
    post.houseTypeFilters = req.body.houseTypeFilters;
    post.priceFilters = req.body.priceFilters;
    post.cityFilters = req.body.cityFilters;
    post.districtFilters = req.body.districtFilters;
    post.image = req.body.image;
    post.user = req.user;

    const errors = await validate(post);
    if (errors.length) throw new ErrorNormalize(400, Object.values(errors[0].constraints)[0]);
    if (!req.user?.role?.includes(UserRole.USER)) throw new ErrorNormalize(403, 'to create a post user role should be "USER"');

    const repository = database.connection.getRepository(Post);
    await repository.save(post).catch(errorCatch(400));

    res.status(201).json(post);
});

export const updatePostController = errorWrapper(async (req: Request & { user: User }, res) => {
    const repository = database.connection.getRepository(Post);
    const post = await repository.findOne({ id: +req.params.postId }, { relations: ['user'] }).catch(errorCatch(400));
    if (!post) throw new ErrorNormalize(404, 'post with this id do not exist');
    if (post.user?.id !== req.user?.id) throw new ErrorNormalize(403, 'this user does not have permissions to edit the post');

    const bodyArr: [key: string, value: never][] = Object.entries(req.body);
    for (const item of bodyArr) {
        if (['isActive', 'views', 'user', 'creationDate'].includes(item[0])) continue;
        post[item[0] as keyof Post] = item[1];
    }

    const errors = await validate(post);
    if (errors.length) throw new ErrorNormalize(400, Object.values(errors[0].constraints)[0]);

    await repository.save(post).catch(errorCatch(400));

    res.json(post);
});
