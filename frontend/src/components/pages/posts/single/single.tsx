import React, { ReactElement } from 'react';

import { useSinglePostSelector } from '../../../../state/entities/posts/posts.selector';
import NotFoundPost from '../../../common/not-found/not-found-post/not-found-post';
import Container from '../../../layout/container/container';

import css from './single.module.scss';

const SinglePostComponent = (): ReactElement => {
    const postState = useSinglePostSelector();
    const postData = postState.data;

    return (
        <NotFoundPost error={!postData.id}>
            <>
                <Container size="sm">
                    <h2 className={css.title}>{postData.title}</h2>
                </Container>

                {postData.image && (
                    <Container size="lg">
                        <img src={postData.image} alt={postData.title} />
                    </Container>
                )}

                <Container className={css.description} size="sm">
                    <p dangerouslySetInnerHTML={{ __html: postData.description }} />
                </Container>
            </>
        </NotFoundPost>
    );
};

export default SinglePostComponent;
