import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import PostsList from '../../components/layout/posts-list/posts-list';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Section from '../../components/layout/section/section';
import UsersPostsFilters from '../../components/pages/users/users-posts-filters/users-posts-filters';
import { usePostListSelector } from '../../state/entities/posts/posts.selector';
import { getUserPostsList } from '../../state/entities/posts/posts.thunk';
import { withStore } from '../../utils/ssr';

const UserProfile = (): ReactElement => {
    const postsState = usePostListSelector();

    return (
        <RootLayout>
            <Section id="home-posts">
                <PostsList posts={postsState}>
                    <UsersPostsFilters />
                </PostsList>
            </Section>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withStore(async ctx => {
    const page = +String(ctx.params?.page || 1);
    const userId = +String(ctx.params?.userId || 0);

    if (!userId) return;
    await ctx.store?.dispatch(
        getUserPostsList({
            userId,
            params: {
                page,
            },
        }),
    );
});

export default UserProfile;
