import React, { useEffect } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { useAppDispatch } from '../../../../hooks/redux.hook';
import { useSinglePostSelector } from '../../../../state/entities/posts/posts.selector';
import { singlePostThunk } from '../../../../state/entities/posts/thunks/single-post.thunk';
import Container from '../../../layout/container/container';

import EditPostForm from './edit-post-form/edit-post-form';
import css from './edit-post.module.scss';
import UpdateImage from './update-image/update-image';

const EditPost = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const postState = useSinglePostSelector();

    const history = useRouter();
    const postId = +String(history.query.postId);

    useEffect(() => {
        if (!postState.data.id) {
            setTimeout(() => {
                dispatch(singlePostThunk(postId));
            }, 2000);
        }
    }, [dispatch, postId, postState]);

    return (
        <>
            <UpdateImage />
            <Container size="sm">
                <div className={css.inner}>{postState.status === 'success' ? <EditPostForm /> : null}</div>
            </Container>
        </>
    );
};

export default EditPost;
