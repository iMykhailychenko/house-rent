import { Request, Response } from 'express';
import { validate } from 'class-validator';

import errorWrapper from '../../utils/errorWrapper';
import database from '../../database';
import { Post } from './posts.entity';
import { User, UserRole } from '../users/users.entity';
import ErrorNormalize from '../../utils/errorNormalize';
import errorCatch from '../../utils/errorCatch';
import { Favorite } from '../favorite/favorite.entity';
import { getSearchFilters } from './posts.validate';
import { POST_STATUS } from './posts.interface';

const isPostInFavorite = async (post: Post, user: User): Promise<boolean> => {
    if (!user) return false;
    const repository = database.connection.getRepository(Favorite);
    const favorite = await repository.findOne({ where: { post: post.id, user: user.id } });
    return !!favorite;
};

export const postsListController = errorWrapper(async (req: Request & { user: User }, res: Response): Promise<void> => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 20;
    const searchFilters = getSearchFilters(req.query);
    const { query, general, room, houseType, price, city, district } = searchFilters;

    const repository = database.connection.getRepository(Post);
    const sqlQuery = repository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .loadRelationCountAndMap('post.favorite', 'post.favorite')
        .loadRelationCountAndMap('post.chats', 'post.chats')
        .where('post.status = :status', { status: POST_STATUS.IDLE })
        .andWhere('((:general)::text[] IS NULL OR (post.generalFilters)::text[] @> (:general)::text[])', { general })
        .andWhere('((:room)::text[] IS NULL OR (post.roomFilters)::text[] @> (:room)::text[])', { room })
        .andWhere('((:houseType)::text[] IS NULL OR (post.houseTypeFilters)::text[] @> (:houseType)::text[])', { houseType })
        .andWhere('((:city)::varchar IS NULL OR post.cityFilters = :city)', { city })
        .andWhere('((:district)::text[] IS NULL OR (post.districtFilters)::text[] @> (:district)::text[])', { district })
        .andWhere('((:price)::text[] IS NULL OR (post.priceFilters)::text[] @> (:price)::text[])', { price })
        .andWhere(
            '(((:query)::varchar IS NULL OR LOWER(post.title) like LOWER(:query)) OR ((:query)::varchar IS NULL OR LOWER(post.description) like LOWER(:query)))',
            { query: query ? `%${query}%` : null },
        )
        .orderBy('post.creationDate', 'DESC');

    const total = (await sqlQuery.getCount().catch(errorCatch(404))) || 0;
    const result = await sqlQuery
        .offset(limit * (page - 1))
        .limit(limit)
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

export const postsListForUserController = errorWrapper(async (req: Request & { user: User }, res: Response): Promise<void> => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 20;
    const userId = +req.params.userId;
    const searchFilters = getSearchFilters(req.query);
    const { query, general, room, houseType, price, city, district } = searchFilters;

    const repository = database.connection.getRepository(Post);
    const sqlQuery = repository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.user', 'user')
        .loadRelationCountAndMap('post.favorite', 'post.favorite')
        .loadRelationCountAndMap('post.chats', 'post.chats')
        .where('user.id = :userId', { userId })
        .andWhere('((:general)::text[] IS NULL OR (post.generalFilters)::text[] @> (:general)::text[])', { general })
        .andWhere('((:room)::text[] IS NULL OR (post.roomFilters)::text[] @> (:room)::text[])', { room })
        .andWhere('((:houseType)::text[] IS NULL OR (post.houseTypeFilters)::text[] @> (:houseType)::text[])', { houseType })
        .andWhere('((:city)::varchar IS NULL OR post.cityFilters = :city)', { city })
        .andWhere('((:district)::text[] IS NULL OR (post.districtFilters)::text[] @> (:district)::text[])', { district })
        .andWhere('((:price)::text[] IS NULL OR (post.priceFilters)::text[] @> (:price)::text[])', { price })
        .andWhere(
            '(((:query)::varchar IS NULL OR LOWER(post.title) like LOWER(:query)) OR ((:query)::varchar IS NULL OR LOWER(post.description) like LOWER(:query)))',
            { query: query ? `%${query}%` : null },
        )
        .orderBy('post.creationDate', 'DESC');

    const total = (await sqlQuery.getCount().catch(errorCatch(404))) || 0;
    const result = await sqlQuery
        .offset(limit * (page - 1))
        .limit(limit)
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

    res.send();
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

    await repository
        .createQueryBuilder('post')
        .update(Post)
        .set({ views: () => 'views + 1' })
        .where({ id: +req.params.postId })
        .execute()
        .catch(errorCatch(400));

    res.json({ ...post, views: post.views + 1, isFavorite: await isPostInFavorite(post, req.user) });
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
