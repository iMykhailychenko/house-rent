import React, { ReactElement } from 'react';

import useTrans from '../../../../hooks/trans.hook';
import { useSinglePostSelector } from '../../../../state/entities/posts/posts.selector';
import { formatDate } from '../../../../utils/helpers';
import FullScreenImg from '../../../common/full-screen-img/full-screen-img';
import ImageWrp from '../../../common/image-wrp/image-wrp';
import NotFoundPost from '../../../common/not-found/not-found-post/not-found-post';
import PostCardFooter from '../../../common/post-card/post-card-footer/post-card-footer';
import Socials from '../../../common/share-links/share-links';
import Container from '../../../layout/container/container';

import css from './single.module.scss';

const SinglePostComponent = (): ReactElement => {
    const trans = useTrans();
    const postState = useSinglePostSelector();
    const postData = postState.data;

    return (
        <NotFoundPost error={!postData.id}>
            <>
                <Container size="md">
                    <>
                        {postData.image && (
                            <div className={css.img}>
                                <FullScreenImg className={css.imgTag} src={postData.image} alt={postData.title} />
                            </div>
                        )}
                    </>
                </Container>
                <Container size="sm">
                    <>
                        <div className={css.header}>
                            <div className={css.inner}>
                                <p className={css.small}>Поділитись цим постом:</p>
                                <Socials title={postData.title} />
                            </div>

                            <div className={css.inner}>
                                <p className={css.small}>Створено:</p>
                                <p className={css.date}>{formatDate(postData.creationDate)}</p>
                            </div>
                        </div>
                        <div className={css.wrap}>
                            <h2 className={css.title}>{postData.title}</h2>
                            <p className={css.text} dangerouslySetInnerHTML={{ __html: postData.description }} />
                        </div>
                        <PostCardFooter post={postData} />

                        <div className={css.row}>
                            <div className={css.cell}>
                                <ImageWrp name="bird" />
                                <p>
                                    {trans('residentsAmount')}: {postData.residentsAmount}
                                </p>
                            </div>

                            <div className={css.cell}>
                                <ImageWrp name="coffee" />
                                <p>{postData.children}</p>
                            </div>

                            <div className={css.cell}>
                                <ImageWrp name="coffee" />
                                <p>{postData.pets}</p>
                            </div>
                        </div>
                    </>
                </Container>
            </>
        </NotFoundPost>
    );
};

export default SinglePostComponent;
