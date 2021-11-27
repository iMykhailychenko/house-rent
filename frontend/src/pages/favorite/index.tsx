import React from 'react';

import { GetServerSideProps } from 'next';

import PrivateLayout from '../../components/layout/private-layout/private-layout';
import Meta from '../../components/meta/meta';
import Favorite from '../../components/pages/favorite/favorite';
import { getFavoritePostsThunk } from '../../state/entities/posts/thunks/post-favorite.thunk';
import { withAuthRedirect } from '../../utils/ssr';

const FavoritePage = (): JSX.Element => {
    return (
        <>
            <Meta />
            <PrivateLayout>
                <Favorite />
            </PrivateLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect(async ctx => {
    const page = +String(ctx.query?.page || 1);
    await ctx.store?.dispatch(getFavoritePostsThunk(page));
});

export default FavoritePage;
