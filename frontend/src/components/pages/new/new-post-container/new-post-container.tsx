import React, { ReactElement } from 'react';

import clsx from 'clsx';

import useAuth from '../../../../hooks/auth.hook';
import JoinForm from '../../../common/auth/join-form/join-form';
import Container from '../../../layout/container/container';
import NewPostForm from '../new-post-form/new-post-form';

import css from './new-post-container.module.scss';

const NewPostContainer = (): ReactElement => {
    const token = useAuth();

    return (
        <Container size="sm" className={css.root}>
            <h2 className={css.title}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error</h2>
            <div className={clsx(css.inner, !token?.accessToken && css.notAuth)}>
                {token?.accessToken ? <NewPostForm /> : <JoinForm />}
            </div>
        </Container>
    );
};

export default NewPostContainer;
