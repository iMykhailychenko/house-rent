import React from 'react';

import clsx from 'clsx';

import useAuth from '../../../../../hooks/auth.hook';
import { FORM_TYPE } from '../../../../../state/entities/posts/posts.interface';
import { useNewPostSelector } from '../../../../../state/entities/posts/posts.selector';
import JoinForm from '../../../../common/auth/join-form/join-form';
import Container from '../../../../layout/container/container';
import NewPostForm from '../new-post-form/new-post-form';

import css from './new-post-container.module.scss';

const titleMap = {
    [FORM_TYPE.ONE]: 'Вже за кілька хвилин ви станете на крок ближче до квартири своєї мрії',
    [FORM_TYPE.TWO]: 'Так тримати! Ви рухаєтесь у правильному напрямку.',
    [FORM_TYPE.THREE]: 'Ми подбали про ваш час і сформували текст оголошення за вас',
    [FORM_TYPE.FOUR]: 'І останній крок',
    [FORM_TYPE.DONE]: 'Вітаємо! Ви зробили це. Ваше оголошення створене та чекає на активацію',
};

const NewPostContainer = (): JSX.Element => {
    const [token] = useAuth();
    const newPostState = useNewPostSelector();

    return (
        <Container size="sm" className={css.root}>
            <h2 className={css.title}>{titleMap[newPostState.formType]}</h2>
            <div className={clsx(css.inner, !token?.accessToken && css.notAuth)}>
                {token?.accessToken ? <NewPostForm /> : <JoinForm />}
            </div>
        </Container>
    );
};

export default NewPostContainer;
