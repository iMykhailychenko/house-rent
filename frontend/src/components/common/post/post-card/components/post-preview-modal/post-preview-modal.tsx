import React, { ReactElement, useEffect } from 'react';

import { useAppDispatch } from '../../../../../../hooks/redux.hook';
import { useSinglePostSelector } from '../../../../../../state/entities/posts/posts.selector';
import { singlePostThunk } from '../../../../../../state/entities/posts/posts.thunk';
import SinglePostComponent from '../../../../../pages/posts/single/single';
import LargeModalWrp from '../../../../modal/components/large-modal-wrp/large-modal-wrp';

import css from './post-preview-modal.module.scss';

interface IProps {
    postId: number;
}

const PostPreviewModal = ({ postId }: IProps): ReactElement => {
    const dispatch = useAppDispatch();
    const postData = useSinglePostSelector();

    useEffect(() => {
        dispatch(singlePostThunk(postId));
    }, [dispatch, postId]);

    return (
        <LargeModalWrp>
            {postData.data ? (
                <SinglePostComponent />
            ) : (
                <div className={css.loading}>
                    <img src="/spinner.gif" alt="" />
                </div>
            )}
        </LargeModalWrp>
    );
};

export default PostPreviewModal;
