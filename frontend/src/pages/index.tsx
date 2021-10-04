import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import PostFilters from '../components/layout/post-filters/post-filters';
import PostsList from '../components/layout/posts-list/posts-list';
import RootLayout from '../components/layout/root-layout/root-layout';
import Section from '../components/layout/section/section';
import Meta from '../components/meta/meta';
import HomeBanner from '../components/pages/home/home-banner/home-banner';
import { useAppDispatch } from '../hooks/redux.hook';
import { usePostListSelector } from '../state/entities/posts/posts.selector';
import { postListPaginationThunk, postListThunk } from '../state/entities/posts/posts.thunk';
import { withStore } from '../utils/ssr';

const HomePage = (): ReactElement => {
    const dispatch = useAppDispatch();
    const postsState = usePostListSelector();
    const title = 'Якщо ви рієлтори чи власник квартири, то в першу чергу зверніть увагу на термінові оголошення';

    const submit = () => {
        dispatch(postListThunk());
    };
    const openPage = async (page: number): Promise<void> => {
        await dispatch(postListThunk(page)).unwrap();
    };
    const loadMore = async (page: number): Promise<void> => {
        await dispatch(postListPaginationThunk(page)).unwrap();
    };

    return (
        <RootLayout>
            <Meta />
            <HomeBanner />
            <Section id="home-posts">
                <PostsList title={title} posts={postsState} onPage={openPage} onMore={loadMore}>
                    <PostFilters onSubmit={submit} />
                </PostsList>
            </Section>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withStore(async ctx => {
    await ctx.store?.dispatch(postListThunk(+String(ctx.query?.page || 1)));
});

export default HomePage;
