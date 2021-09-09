import React, { ReactElement } from 'react';

import { Bookmark, Visibility } from '@material-ui/icons';

import { useSinglePostSelector } from '../../../../state/entities/posts/posts.selector';
import Button from '../../../common/button/button';
import NotFoundPost from '../../../common/not-found/not-found-post/not-found-post';
import Socials from '../../../common/share-links/share-links';
import Container from '../../../layout/container/container';

import css from './single.module.scss';
import FullScreenImg from "../../../common/full-screen-img/full-screen-img";

const SinglePostComponent = (): ReactElement => {
    const postState = useSinglePostSelector();
    const postData = postState.data;

    return (
        <NotFoundPost error={!postData.id}>
            <>
                <Container size="sm">
                    <>
                        <h2 className={css.title}>{postData.title}</h2>

                        {postData.image && (
                            <div className={css.img}>
                                <FullScreenImg className={css.imgTag} src={postData.image} alt={postData.title} />
                            </div>
                        )}

                        <div className={css.header}>
                            <div className={css.inner}>
                                <p className={css.small}>Поділитись цим постом:</p>
                                <Socials title={postData.title} />
                            </div>

                            <div className={css.inner}>
                                <p className={css.small}>Створено:</p>
                                <p className={css.date}>{postData.creationDate}</p>
                            </div>
                        </div>

                        <div className={css.action}>
                            <Button secondary>
                                <Bookmark />
                            </Button>
                            <div className={css.visibility}>
                                <Visibility />
                                <span>10</span>
                            </div>
                        </div>

                        <div className={css.description}>
                            <h3 className={css.subtitle}>{'description'}</h3>
                            <p dangerouslySetInnerHTML={{ __html: postData.description }} />
                        </div>
                    </>
                </Container>
            </>
        </NotFoundPost>
    );
};

export default SinglePostComponent;
