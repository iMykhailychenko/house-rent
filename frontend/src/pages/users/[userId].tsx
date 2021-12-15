import React, { useEffect } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import PostFilters from '../../components/common/post/post-filters/post-filters';
import PostsList from '../../components/common/post/posts-list/posts-list';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Section from '../../components/layout/section/section';
import Meta from '../../components/meta/meta';
import UserBanner from '../../components/pages/users/user-banner/user-banner';
import endpoint from '../../config/endpoint.config';
import { LANG } from '../../constant/lang.constant';
import { useAppDispatch } from '../../hooks/redux.hook';
import { IUser, Pagination } from '../../interfaces';
import { getUserPostsListThunk } from '../../state/entities/posts/thunks/user-posts.thunk';
import { getRatingThunk } from '../../state/entities/rating/rating.thunk';
import { userInfoThunk } from '../../state/entities/users/users.thunk';
import { wrapper } from '../../state/store';
import api from '../../utils/interceptors';

const UserProfilePage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const router = useRouter();
    const userId = +String(router.query.userId);

    const submit = (): void => {
        dispatch(getUserPostsListThunk(userId));
    };

    useEffect(() => {
        dispatch(getRatingThunk(userId));
    }, [dispatch, userId]);

    return (
        <GetStaticProfile>
            <Meta />
            <RootLayout>
                <Container size="lg">
                    <UserBanner />
                </Container>
                <Section id="home-posts">
                    <PostsList title="Усі активні пости користувача">
                        <PostFilters onSubmit={submit} />
                    </PostsList>
                </Section>
            </RootLayout>
        </GetStaticProfile>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get<Pagination<IUser>>(endpoint('/users'), { params: { limit: 500, page: 1 } });

    return {
        paths: data.data.reduce((acc, item) => {
            const lang = LANG.map(locale => ({ params: { userId: String(item.id) }, locale }));
            return [...acc, ...lang];
        }, [] as Array<string | { params: ParsedUrlQuery; locale?: string }>),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(store => async context => {
    const userId = +String(context.params?.userId || 0);

    if (userId) {
        await store.dispatch(getUserPostsListThunk(userId));
        await store.dispatch(userInfoThunk(userId));
    }

    return { props: {} };
});

export default UserProfilePage;
