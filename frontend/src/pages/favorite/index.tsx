import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import PrivateLayout from '../../components/layout/private-layout/private-layout';
import Meta from '../../components/meta/meta';
import Favorite from '../../components/pages/favorite/favorite';
import { useAppDispatch } from '../../hooks/redux.hook';
import { getFavoritePostsThunk } from '../../state/entities/posts/thunks/post-favorite.thunk';

const FavoritePage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const router = useRouter();
    const page = +String(router.query?.page || 1);

    useEffect(() => {
        dispatch(getFavoritePostsThunk(page));
    }, [dispatch, page]);

    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta />
                <PrivateLayout>
                    <Favorite />
                </PrivateLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default FavoritePage;
