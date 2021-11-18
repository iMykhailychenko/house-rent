import React from 'react';

import { GetServerSideProps } from 'next';

import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import SinglePostComponent from '../../components/pages/posts/single/single';
import { singlePostThunk } from '../../state/entities/posts/thunks/single-post.thunk';
import { withStore } from '../../utils/ssr';

const SinglePostPage = (): JSX.Element => {
    return (
        <>
            <Meta />
            <RootLayout>
                <SinglePostComponent />
            </RootLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withStore(async ctx => {
    const postId = +String(ctx.params?.postId || 0);
    await ctx.store?.dispatch(singlePostThunk(postId));
});

export default SinglePostPage;
