import React, { useEffect } from 'react';

import { useRecentPosts } from '../../../../hooks/recent-posts.hook';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import useTrans from '../../../../hooks/trans.hook';
import { POST_STATUS } from '../../../../state/entities/posts/posts.interface';
import { useSinglePostSelector } from '../../../../state/entities/posts/posts.selector';
import { POST_IN_ARCHIVE, POST_IN_DRAFT } from '../../../../utils/common-banners';
import { formatDate } from '../../../../utils/helpers/date.helper';
import { banner } from '../../../common/banner/banner';
import FullScreenImg from '../../../common/full-screen-img/full-screen-img';
import NotFoundPost from '../../../common/not-found/not-found-post/not-found-post';
import PostCardFooter from '../../../common/post/post-card/components/post-card-footer/post-card-footer';
import Socials from '../../../common/share-links/share-links';
import Container from '../../../layout/container/container';

import AboutApartment from './about-apartment/about-apartment';
import AboutAuthor from './about-author/about-author';
import css from './single.module.scss';

const SinglePostComponent = (): JSX.Element => {
    const trans = useTrans();
    const dispatch = useAppDispatch();

    const postState = useSinglePostSelector();
    const postData = postState.data;

    const storage = useRecentPosts();
    useEffect(() => {
        if (postData.id) {
            storage.set(postData);
        }
    }, [postData, storage]);

    useEffect(() => {
        if (postData.status === POST_STATUS.ARCHIVE) {
            banner.add(POST_IN_ARCHIVE);
        }
        if (postData.status === POST_STATUS.DRAFT) {
            banner.add(POST_IN_DRAFT);
        }
    }, [dispatch, postData.status]);

    return (
        <NotFoundPost error={!!postState.error}>
            <>
                <Container className={css.container} size="md">
                    <>
                        {postData.image && (
                            <div className={css.img}>
                                <FullScreenImg className={css.imgTag} src={postData.image} alt={postData.title} />
                            </div>
                        )}
                    </>
                </Container>
                <Container className={css.container} size="sm">
                    <>
                        <div className={css.header}>
                            <div className={css.inner}>
                                <p className={css.small}>{trans('share_this_post')}:</p>
                                <Socials title={postData.title} />
                            </div>

                            <div className={css.inner}>
                                <p className={css.small}>{trans('created')}:</p>
                                <p className={css.date}>{formatDate(postData.createdAt, trans)}</p>
                            </div>
                        </div>

                        <h2 className={css.title}>{postData.title}</h2>
                        <p
                            className={css.text}
                            dangerouslySetInnerHTML={{ __html: postData.description.replace(/\n/g, '<br/>') }}
                        />

                        <PostCardFooter post={postData} />

                        <AboutAuthor post={postData} />

                        <AboutApartment post={postData} />

                        <div className={css.wrap}>
                            <PostCardFooter size="lg" post={postData} />
                        </div>
                    </>
                </Container>
            </>
        </NotFoundPost>
    );
};

export default SinglePostComponent;
