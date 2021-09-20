import errorWrapper from '../../utils/errorWrapper';
import database from '../../database';
import { Post } from '../posts/posts.entity';
import { User } from '../users/users.entity';
import ErrorNormalize from '../../utils/errorNormalize';
import { Favorite } from './favorite.entity';
import { Request, Response } from 'express';
import errorCatch from '../../utils/errorCatch';

export const addToFavorite = errorWrapper(async (req: Request & { user: User }, res: Response) => {
    const postRepository = database.connection.getRepository(Post);

    const post = await postRepository.findOne({ id: +req.params.postId }).catch(errorCatch(404));
    if (!post) throw new ErrorNormalize(404, 'post with this id do not exist');

    const favorite = new Favorite();
    favorite.post = post;
    favorite.user = req.user;

    const favoriteRepository = database.connection.getRepository(Favorite);
    await favoriteRepository.save(favorite).catch(errorCatch(400));

    res.status(204).send();
});

export const deleteFromFavorite = errorWrapper(async (req: Request & { user: User }, res: Response) => {
    const postRepository = database.connection.getRepository(Post);

    const post = await postRepository.findOne({ id: +req.params.postId }).catch(errorCatch(404));
    if (!post) throw new ErrorNormalize(404, 'post with this id do not exist');

    const favoriteRepository = database.connection.getRepository(Favorite);
    const favorite = await favoriteRepository.findOne({ where: { post: post.id, user: req.user.id } }).catch(errorCatch(400));

    if (favorite) {
        await favoriteRepository.delete(favorite).catch(errorCatch(400));
    }

    res.status(204).send();
});
