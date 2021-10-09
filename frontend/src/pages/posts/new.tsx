import React, { ReactElement, useEffect } from 'react';

import { GetServerSideProps } from 'next';

import RootLayout from '../../components/layout/root-layout/root-layout';
import NewPostContainer from '../../components/pages/posts/new/new-post-container/new-post-container';
import { withStore } from '../../utils/ssr';

const NewPostPage = (): ReactElement => {
    useEffect(() => {
        document.body.classList.add('new-post-page');
        return () => document.body.classList.remove('new-post-page');
    }, []);

    return (
        <RootLayout withFooter={false}>
            <NewPostContainer />
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withStore();

export default NewPostPage;
