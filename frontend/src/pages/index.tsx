import React from 'react';

import { GetServerSideProps } from 'next';

import { modal } from '../components/common/modal/modal';
import PostFilters from '../components/common/post/post-filters/post-filters';
import PostsList from '../components/common/post/posts-list/posts-list';
import RootLayout from '../components/layout/root-layout/root-layout';
import Section from '../components/layout/section/section';
import Meta from '../components/meta/meta';
import HomeBanner from '../components/pages/home/home-banner/home-banner';
import { useAppDispatch } from '../hooks/redux.hook';
import { postListPaginationThunk, postListThunk } from '../state/entities/posts/thunks/post-list.thunk';
import { profileInfoThunk } from '../state/entities/profile/profile.thunk';
import { wrapper } from '../state/store';
import { cookieAuth } from '../utils/helpers/cookie.helper';

const HomePage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const title = 'Якщо ви рієлтори чи власник квартири, то в першу чергу зверніть увагу на термінові оголошення';

    const submit = () => {
        modal.close();
        dispatch(postListThunk());
    };
    const openPage = async (page: number): Promise<void> => {
        await dispatch(postListThunk(page));
    };
    const loadMore = async (page: number): Promise<void> => {
        await dispatch(postListPaginationThunk(page));
    };

    return (
        <>
            <Meta />
            <RootLayout>
                <HomeBanner />
                <Section id="home-posts">
                    <PostsList title={title} onPage={openPage} onMore={loadMore}>
                        <PostFilters onSubmit={submit} />
                    </PostsList>
                </Section>
            </RootLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async context => {
    if (cookieAuth(context.req.headers.cookie).accessToken) {
        await store.dispatch(profileInfoThunk());
    }

    await store.dispatch(postListThunk(Number(context.query?.page) || 1));
    return { props: {} };
});

export default HomePage;
