import React from 'react';

import { GetStaticPaths } from 'next';

import { ParsedUrlQuery } from 'querystring';

import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import SinglePostComponent from '../../components/pages/posts/single/single';
import endpoint from '../../config/endpoint.config';
import { LANG } from '../../constant/lang.constant';
import { Pagination } from '../../interfaces';
import { IPost } from '../../state/entities/posts/posts.interface';
import { singlePostThunk } from '../../state/entities/posts/thunks/single-post.thunk';
import { wrapper } from '../../state/store';
import api from '../../utils/interceptors';
import routes from '../../utils/routes';

const SinglePostPage = (): JSX.Element => {
    return (
        <GetStaticProfile>
            <Meta />
            <RootLayout href={routes.home}>
                <SinglePostComponent />
            </RootLayout>
        </GetStaticProfile>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get<Pagination<IPost>>(endpoint('/posts'), { params: { limit: 500, page: 1 } });

    return {
        paths: data.data.reduce((acc, item) => {
            const lang = LANG.map(locale => ({ params: { postId: String(item.id) }, locale }));
            return [...acc, ...lang];
        }, [] as Array<string | { params: ParsedUrlQuery; locale?: string }>),
        fallback: true,
    };
};

export const getStaticProps = wrapper.getStaticProps(store => async ({ params }) => {
    const postId = Number(params?.postId);

    if (!postId) {
        return {
            notFound: true,
        };
    }

    await store.dispatch(singlePostThunk(postId));

    return { props: {} };
});

export default SinglePostPage;
