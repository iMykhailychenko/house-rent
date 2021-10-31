import React from 'react';

import Link from 'next/link';

import useTrans from '../../../../hooks/trans.hook';
import { IPost } from '../../../../state/entities/posts/posts.interface';
import { cutString, formatDate } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import FullScreenImg from '../../full-screen-img/full-screen-img';
import ImageWrp from '../../image-wrp/image-wrp';
import Tooltip from '../../tooltip/tooltip';

import css from './user-post-card.module.scss';

interface IProps {
    post: IPost;
}
const UserPostCard = ({ post }: IProps): JSX.Element => {
    const trans = useTrans();

    return (
        <div className={css.root}>
            {post.image ? (
                <FullScreenImg className={css.img} src={post.image} />
            ) : (
                <div className={css.noImg}>
                    <ImageWrp name="error" />
                    <p>Фото відсутнє</p>
                </div>
            )}

            <div className={css.content}>
                <Link href={routes.posts.single(post.id)}>
                    <a className={css.link}>
                        <Tooltip classNameWrp={css.tooltip} content={post.title}>
                            <h3>{post.title}</h3>
                        </Tooltip>
                        <p>{cutString(post.description, 80)}</p>
                        <p className={css.date}>Дата створення: {formatDate(post.createdAt, trans)}</p>

                        <span className={css[post.status]}>Статус оголошення: {post.status}</span>
                    </a>
                </Link>
            </div>

            <div className={css.footer}>
                <button type="button" className={css.editBtn}>
                    Видалити
                </button>
                <button type="button" className={css.editBtn}>
                    Редагувати
                </button>
                <button type="button" className={css.editBtn}>
                    Інше
                </button>
            </div>
        </div>
    );
};

export default UserPostCard;
