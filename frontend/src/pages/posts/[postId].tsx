import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import RootLayout from '../../components/layout/root-layout/root-layout';
import SinglePostComponent from '../../components/pages/posts/single/single';
import { singlePostThunk } from '../../state/entities/posts/posts.thunk';
import { withStore } from '../../utils/ssr';

const SinglePost = (): ReactElement => {
    return (
        <RootLayout>
            <SinglePostComponent />
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withStore(async ctx => {
    const postId = +String(ctx.params?.postId || 0);
    await ctx.store?.dispatch(singlePostThunk(postId));
});

export default SinglePost;
