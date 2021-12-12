import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import useTrans from '../../../../hooks/trans.hook';
import { IPost } from '../../../../state/entities/posts/posts.interface';
import { formatDate } from '../../../../utils/helpers/date.helper';
import { cutString } from '../../../../utils/helpers/string.helper';
import { postActionsMap, postFunctionsMap } from '../../../../utils/post-functions';
import routes from '../../../../utils/routes';
import FullScreenImg from '../../full-screen-img/full-screen-img';
import ImageWrp from '../../image-wrp/image-wrp';
import userPostActions from '../../modal/modals/user-post-actions/user-post-actions';
import Tooltip from '../../tooltip/tooltip';

import css from './user-post-card.module.scss';

interface IProps {
    post: IPost;
}
const UserPostCard = ({ post }: IProps): JSX.Element => {
    const trans = useTrans();
    const history = useRouter();
    const functions = postFunctionsMap(history);

    const handleAction = async (index: number): Promise<void> => {
        const action = postActionsMap[post.status][index];
        await functions[action](post.id);
    };

    const handleFirstAction = async (): Promise<void> => await handleAction(0);
    const handleSecondAction = async (): Promise<void> => await handleAction(1);

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
                        <Tooltip className={css.tooltip} content={post.title}>
                            <h3>{post.title}</h3>
                        </Tooltip>
                        <p className={css.description}>{post.description}</p>
                        <p className={css.date}>Дата створення: {formatDate(post.createdAt, trans)}</p>
                        <span className={css[post.status]}>{post.status}</span>
                    </a>
                </Link>
            </div>

            <div className={css.footer}>
                <button type="button" className={css.editBtn} onClick={handleFirstAction}>
                    {postActionsMap[post.status][0]}
                </button>
                <button type="button" className={css.editBtn} onClick={handleSecondAction}>
                    {postActionsMap[post.status][1]}
                </button>
                <button type="button" className={css.editBtn} onClick={userPostActions(post)}>
                    Інше
                </button>
            </div>
        </div>
    );
};

export default UserPostCard;
