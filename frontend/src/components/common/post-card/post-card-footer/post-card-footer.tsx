import React, { ReactElement } from 'react';

import { Bookmark, Share, Visibility } from '@material-ui/icons';

import { IPost } from '../../../../state/entities/posts/posts.interface';
import Button from '../../button/button';
import { modal } from '../../modal/modal';
import StickyModal from '../../modal/sticky-modal/sticky-modal';
import Tooltip from '../../tooltip/tooltip';
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
                <Tooltip content="Поділитись оголошенням">
                    <Button size={size} secondary onClick={openSharePostModal}>
                        <Share />
                    </Button>
                </Tooltip>

                <Tooltip
                    className={css.tooltip}
                    content="Додати оголошення в обрані. Натисніть якщо бажаете повернутись до цього оголошення пізніше"
                >
                    <Button size={size} secondary>
                        <Bookmark />
                    </Button>
                </Tooltip>

                <div className={css.visibility}>
                    <Visibility />
                    <span>{post.views}</span>
                </div>
            </div>

            <div className={css.info}>
                <Tooltip className={css.tooltip} content="Натисніть щоб розпочати чат з автором оголошення">
                    <Button size={size} primary>
                        Відповісти
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};

export default PostCardFooter;
