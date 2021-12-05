import React from 'react';

import { useRouter } from 'next/router';

import PostFilters from '../../components/common/post/post-filters/post-filters';
import PostsList from '../../components/common/post/posts-list/posts-list';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Section from '../../components/layout/section/section';
import Meta from '../../components/meta/meta';
import UserBanner from '../../components/pages/users/user-banner/user-banner';
import { useAppDispatch } from '../../hooks/redux.hook';
import { getUserPostsListPaginationThunk, getUserPostsListThunk } from '../../state/entities/posts/thunks/user-posts.thunk';

const UserProfilePage = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const router = useRouter();
    const userId = +String(router.query.userId);

    const submit = (): void => {
        dispatch(getUserPostsListThunk({ userId, page: 1 }));
    };
    const openPage = async (page: number): Promise<void> => {
        dispatch(getUserPostsListThunk({ userId, page }));
    };
    const loadMore = async (page: number): Promise<void> => {
        await dispatch(getUserPostsListPaginationThunk({ userId, page }));
    };

    return (
        <>
            <Meta />
            <RootLayout>
                <Container size="lg">
                    <UserBanner />
                </Container>
                <Section id="home-posts">
                    <PostsList title="Усі активні пости користувача" onPage={openPage} onMore={loadMore}>
                        <PostFilters onSubmit={submit} />
                    </PostsList>
                </Section>
            </RootLayout>
        </>
    );
};

// export const getServerSideProps: GetServerSideProps = withStore(async ctx => {
//     const page = +String(ctx.query?.page || 1);
//     const userId = +String(ctx.params?.userId || 0);
//
//     if (!userId) return;
//     await ctx.store?.dispatch(getUserPostsListThunk({ userId, page }));
//     await ctx.store?.dispatch(userInfoThunk(userId));
// });

export default UserProfilePage;
