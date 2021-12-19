import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useAppDispatch } from '../../../../hooks/redux.hook';
import { useSinglePostSelector, useUpdateLoadingSelector } from '../../../../state/entities/posts/posts.selector';
import { singlePostThunk } from '../../../../state/entities/posts/thunks/single-post.thunk';
import Container from '../../../layout/container/container';

import EditPostForm from './edit-post-form/edit-post-form';
import EditPostSkeleton from './edit-post-skeleton/edit-post-skeleton';
import css from './edit-post.module.scss';
import UpdateImage from './update-image/update-image';
import UploadProvider from './update-image/update-image.context';

const EditPost = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const history = useRouter();
    const postId = Number(history.query.postId);

    const status = useUpdateLoadingSelector();
    const postState = useSinglePostSelector();

    useEffect(() => {
        if (!postState.data.id) {
            dispatch(singlePostThunk(postId));
        }
    }, [dispatch, postId, postState]);

    return (
        <UploadProvider>
            <>
                {status === 'loading' && <img className={css.spinner} src="/spinner.gif" alt="" />}
                <UpdateImage />
                <Container size="sm">
                    <div className={css.inner}>{postState.status === 'success' ? <EditPostForm /> : <EditPostSkeleton />}</div>
                </Container>
            </>
        </UploadProvider>
    );
};

export default EditPost;
