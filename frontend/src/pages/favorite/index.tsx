import React from 'react';

import PrivateLayout from '../../components/layout/private-layout/private-layout';
import Meta from '../../components/meta/meta';
import Favorite from '../../components/pages/favorite/favorite';

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

// export const getServerSideProps: GetServerSideProps = withAuthRedirect(async ctx => {
//     const page = +String(ctx.query?.page || 1);
//     await ctx.store?.dispatch(getFavoritePostsThunk(page));
// });

export default FavoritePage;
