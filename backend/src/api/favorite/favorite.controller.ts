import errorWrapper from '../../utils/errorWrapper';
import database from '../../database';
import { Post } from '../posts/posts.entity';
import { User } from '../users/users.entity';
import ErrorNormalize from '../../utils/errorNormalize';
import { Favorite } from './favorite.entity';
import { Request, Response } from 'express';

export const addToFavorite = errorWrapper(async (req: Request & { user: User }, res: Response) => {
    const postRepository = database.connection.getRepository(Post);

    const post = await postRepository.findOne({ id: +req.params.postId }).catch(error => {
        throw new ErrorNormalize(404, error);
    });
    if (!post) throw new ErrorNormalize(404, 'post with this id do not exist');

    const favorite = new Favorite();
    favorite.post = post;
    favorite.user = req.user;

    const favoriteRepository = database.connection.getRepository(Favorite);
    await favoriteRepository.save(post).catch(error => {
        throw new ErrorNormalize(400, error);
    });

    res.status(204).send();
});
