import React, { ReactElement } from 'react';

import clsx from 'clsx';

import useAuth from '../../../../../hooks/auth.hook';
import { useNewPostSelector } from '../../../../../state/entities/posts/posts.selector';
import JoinForm from '../../../../common/auth/join-form/join-form';
import Container from '../../../../layout/container/container';
import NewPostForm from '../new-post-form/new-post-form';
import NewPostImg from '../new-post-img/new-post-img';

import css from './new-post-container.module.scss';

const NewPostContainer = (): ReactElement => {
    const [token] = useAuth();
    const newPostState = useNewPostSelector();
    const isImgUpload = newPostState.postStatus === 'success' && newPostState.imgStatus !== 'success';
    const renderPostForm = (): ReactElement => (isImgUpload ? <NewPostImg /> : <NewPostForm />);

    return (
        <Container size="sm" className={css.root}>
            <h2 className={css.title}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error</h2>
            <div className={clsx(css.inner, !token?.accessToken && css.notAuth)}>
                {token?.accessToken ? renderPostForm() : <JoinForm />}
            </div>
        </Container>
    );
};

export default NewPostContainer;
