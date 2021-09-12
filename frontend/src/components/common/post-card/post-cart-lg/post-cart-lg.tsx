import React, { ReactElement } from 'react';

import { Bookmark, Share, Visibility } from '@material-ui/icons';
import Link from 'next/link';

import { IPost } from '../../../../state/entities/posts/posts.interface';
import { cutString } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import Button from '../../button/button';
import FullScreenImg from '../../full-screen-img/full-screen-img';
import { modal } from '../../modal/modal';
import StickyModal from '../../modal/sticky-modal/sticky-modal';
import UserCard from '../../user-card/user-card';
import PostInfoBlock from '../post-info-block/post-info-block';
import SharePostModal from '../share-post-modal/share-post-modal';

import css from './post-cart-lg.module.scss';

interface IProps {
    post: IPost;
}

const PostCardLg = ({ post }: IProps): ReactElement => {
    const openSharePostModal = (): void => {
        modal.open(
            <StickyModal>
                <SharePostModal post={post} />
            </StickyModal>,
        );
    };
    return (
        <div className={css.root}>
            <UserCard
                user={{ avatar: post.user.avatar, firstName: post.user.firstName, lastName: post.user.lastName }}
                date={post.creationDate}
            />

            <div className={css.content}>
                <div className={css.flex}>
                    {post.image ? <FullScreenImg className={css.img} src={post.image} /> : <p className={css.img}>Без фото</p>}

                    <Link href={routes.posts.single(post.id)}>
                        <a className={css.link}>
                            <h3>{post.title}</h3>
                            <p>{cutString(post.description, 180)}</p>
                        </a>
                    </Link>
                </div>

                <PostInfoBlock post={post} />

                <div className={css.flex}>
                    <div className={css.info}>
                        <Button secondary onClick={openSharePostModal}>
                            <Share />
                        </Button>
                        <Button secondary>
                            <Bookmark />
                        </Button>
                        <div className={css.visibility}>
                            <Visibility />
                            <span>{post.views}</span>
                        </div>
                    </div>

                    <div className={css.info}>
                        <Button secondary>Відкрити чат</Button>
                        <Button primary>Запропонувати квартиру</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCardLg;
