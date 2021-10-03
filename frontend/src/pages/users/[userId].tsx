import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import PostFilters from '../../components/layout/post-filters/post-filters';
import PostsList from '../../components/layout/posts-list/posts-list';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Section from '../../components/layout/section/section';
import { useAppDispatch } from '../../hooks/redux.hook';
import { usePostListSelector } from '../../state/entities/posts/posts.selector';
import { getUserPostsList } from '../../state/entities/posts/posts.thunk';
import { withStore } from '../../utils/ssr';

const UserProfile = (): ReactElement => {
    const dispatch = useAppDispatch();
    const postsState = usePostListSelector();

    const router = useRouter();
    const userId = +String(router.query.userId);

    const submit = (): void => {
        dispatch(getUserPostsList({ userId, page: 1 }));
    };

    return (
        <RootLayout>
            <Section id="home-posts">
                <PostsList posts={postsState}>
                    <PostFilters onSubmit={submit} />
                </PostsList>
            </Section>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withStore(async ctx => {
    const page = +String(ctx.params?.page || 1);
    const userId = +String(ctx.params?.userId || 0);

    if (!userId) return;
    await ctx.store?.dispatch(getUserPostsList({ userId, page }));
});

export default UserProfile;
