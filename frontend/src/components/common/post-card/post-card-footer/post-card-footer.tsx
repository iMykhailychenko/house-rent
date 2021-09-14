import React, { ReactElement } from 'react';

import { Bookmark, Share, Visibility } from '@material-ui/icons';

import { IPost } from '../../../../state/entities/posts/posts.interface';
import Button from '../../button/button';
import { modal } from '../../modal/modal';
import StickyModal from '../../modal/sticky-modal/sticky-modal';
import SharePostModal from '../share-post-modal/share-post-modal';

import css from './post-card-footer.module.scss';

interface IProps {
    size?: 'sm' | 'md';
    post: IPost;
}

const PostCardFooter = ({ size = 'md', post }: IProps): ReactElement => {
    const openSharePostModal = (): void => {
        modal.open(
            <StickyModal>
                <SharePostModal post={post} />
            </StickyModal>,
        );
    };

    return (
        <div className={css.flex}>
            <div className={css.info}>
                <Button size={size} secondary onClick={openSharePostModal}>
                    <Share />
                </Button>
                <Button size={size} secondary>
                    <Bookmark />
                </Button>
                <div className={css.visibility}>
                    <Visibility />
                    <span>{post.views}</span>
                </div>
            </div>

            <div className={css.info}>
                <Button size={size} primary>
                    Відповісти
                </Button>
            </div>
        </div>
    );
};

export default PostCardFooter;
