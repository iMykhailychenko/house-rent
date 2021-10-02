import React, { ReactElement, useRef, useState } from 'react';

import uiConfig from '../../../../config/ui.config';
import useConfig from '../../../../hooks/config.hook';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import useTrans from '../../../../hooks/trans.hook';
import { usePostListSelector } from '../../../../state/entities/posts/posts.selector';
import { postListPaginationThunk, postListThunk } from '../../../../state/entities/posts/posts.thunk';
import PostCard from '../../../common/post-card/post-card';
import PostsSkeleton from '../../../common/skeletons/posts-sleleton/posts-skeleton';
import Container from '../../../layout/container/container';
import Section from '../../../layout/section/section';
import Pagination from '../../posts/new/new-post-form/pagination/pagination';

import HomePostFilters from './home-post-filters/home-post-filters';
import css from './home-posts.module.scss';

const HomePosts = (): ReactElement => {
    const trans = useTrans();
    const [config] = useConfig();
    const dispatch = useAppDispatch();
    const postsState = usePostListSelector();
    const loading = postsState.status === 'loading';
    const ref = useRef<HTMLDivElement>(null);

    const [loadingMore, setLoadingMore] = useState(false);

    const openPage = (page: number): void => {
        const top = ref.current?.offsetTop || 0;
        window.scrollTo({ top: top - 150, behavior: 'smooth' });
        dispatch(postListThunk(page));
    };
    const loadMore = (page: number): void => {
        const top = (ref.current?.offsetTop || 0) + (ref.current?.offsetHeight || 0) - 300;
        window.scrollTo({ top, behavior: 'smooth' });
        setLoadingMore(true);
        dispatch(postListPaginationThunk(page))
            .unwrap()
            .finally(() => setLoadingMore(false));
    };

    return (
        <Section id="home-posts">
            <Container size="md">
                <div className={css.root}>
                    <h2 className="title-2">
                        {trans('Якщо ви рієлтори чи власник квартири, то в першу чергу зверніть увагу на термінові оголошення')}
                    </h2>

                    <div className={css.flex}>
                        <div className={css[config.cardSize]}>
                            <div ref={ref} className={css.inner}>
                                {loading ? (
                                    <PostsSkeleton amount={uiConfig.postsPerPage} />
                                ) : (
                                    postsState.data.map(item => <PostCard key={item.id} post={item} />)
                                )}
                                {loadingMore && <PostsSkeleton amount={uiConfig.postsPerPage} />}
                            </div>
                            <Pagination
                                total={postsState.totalPages}
                                loading={loading || loadingMore}
                                onPage={openPage}
                                onMore={loadMore}
                            />
                        </div>
                        <HomePostFilters />
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default HomePosts;
