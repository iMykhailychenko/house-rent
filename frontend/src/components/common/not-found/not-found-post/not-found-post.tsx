import React, { ReactElement } from 'react';

import routes from '../../../../utils/routes';
import Container from '../../../layout/container/container';
import ImageWrp from '../../image-wrp/image-wrp';
import Link from '../../link/link';

import css from './not-found-post.module.scss';

interface IProps {
    error?: boolean;
    children: ReactElement;
}

const NotFoundPost = ({ error = false, children }: IProps): ReactElement => {
    return error ? (
        <Container size="md" className={css.root}>
            <div className={css.inner}>
                <ImageWrp name="error" />
                <p>Такого поста не існує або він був видалений автором</p>
                <Link href={routes.home} primary>
                    Повернутися на головну
                </Link>
            </div>
        </Container>
    ) : (
        children
    );
};

export default NotFoundPost;
