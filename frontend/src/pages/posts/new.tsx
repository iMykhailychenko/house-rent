import React, { useEffect } from 'react';

import { GetServerSideProps } from 'next';

import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import NewPostContainer from '../../components/pages/posts/new/new-post-container/new-post-container';
import { withStore } from '../../utils/ssr';

const NewPostPage = (): JSX.Element => {
    useEffect(() => {
        document.body.classList.add('new-post-page');
        return () => document.body.classList.remove('new-post-page');
    }, []);

    return (
        <>
            <Meta />
            <RootLayout withFooter={false}>
                <NewPostContainer />
            </RootLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withStore();

export default NewPostPage;
