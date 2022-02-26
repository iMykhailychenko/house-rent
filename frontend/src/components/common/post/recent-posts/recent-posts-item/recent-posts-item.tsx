import React from 'react';

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { CSSTransition } from 'react-transition-group';

import uiConfig from '../../../../../config/ui.config';
import useTrans from '../../../../../hooks/trans.hook';
import { IRecentPost } from '../../../../../interfaces';
import { formatDate } from '../../../../../utils/helpers/date.helper';
import routes from '../../../../../utils/routes';

import css from './recent-posts-item.module.scss';

interface IProps {
    index?: number;
    post: IRecentPost;
}

export const RecentPostsItem = ({ post, index = 1 }: IProps): JSX.Element => {
    const trans = useTrans();
    const deltaIndex = (index % 8) + 1;

    return (
        <CSSTransition in timeout={100 + deltaIndex * 100} appear>
            <a href={routes.posts.single(post.id)} className={css.card} target="_blank" rel="noopener noreferrer">
                <img className={css.img} src={post.img || '/icons/no_img.png'} alt={post.title} />

                <div className={css.container}>
                    <small className={css.date}>{formatDate(post.date, trans)}</small>
                    <p className={css.title}>{post.title}</p>

                    <ArrowForwardOutlinedIcon className={css.icon} />
                </div>
            </a>
        </CSSTransition>
    );
};
