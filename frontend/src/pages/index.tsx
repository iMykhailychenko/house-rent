import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import PostsList from '../components/layout/posts-list/posts-list';
import RootLayout from '../components/layout/root-layout/root-layout';
import Section from '../components/layout/section/section';
import Meta from '../components/meta/meta';
import HomeBanner from '../components/pages/home/home-banner/home-banner';
import HomePostFilters from '../components/pages/home/home-post-filters/home-post-filters';
import { usePostListSelector } from '../state/entities/posts/posts.selector';
import { postListThunk } from '../state/entities/posts/posts.thunk';
import { withStore } from '../utils/ssr';

const HomePage = (): ReactElement => {
    const postsState = usePostListSelector();

    return (
        <RootLayout>
            <Meta />
            <HomeBanner />
            <Section id="home-posts">
                <PostsList posts={postsState}>
                    <HomePostFilters />
                </PostsList>
            </Section>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withStore(async ctx => {
    await ctx.store?.dispatch(postListThunk(+String(ctx.params?.page || 1)));
});

export default HomePage;
