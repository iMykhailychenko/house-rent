import { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import RootLayout from '../components/layout/root-layout/root-layout';
import Meta from '../components/meta/meta';
import HomeBanner from '../components/pages/home/home-banner/home-banner';
import HomePosts from '../components/pages/home/home-posts/home-posts';
import { postListThunk } from '../state/entities/posts/posts.thunk';
import { withStore } from '../utils/ssr';

const HomePage = (): ReactElement => {
    return (
        <RootLayout>
            <Meta />
            <HomeBanner />
            <HomePosts />
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withStore(async ctx => {
    await ctx.store?.dispatch(postListThunk(+String(ctx.params?.page || 1)));
});

export default HomePage;
