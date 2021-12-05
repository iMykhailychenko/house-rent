import React from 'react';

import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import SinglePostComponent from '../../components/pages/posts/single/single';

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

// export const getServerSideProps: GetServerSideProps = withStore(async ctx => {
//     const postId = +String(ctx.params?.postId || 0);
//     await ctx.store?.dispatch(singlePostThunk(postId));
// });

export default SinglePostPage;
