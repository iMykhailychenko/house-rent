import React, { ReactElement, useEffect } from 'react';

import { GetServerSideProps } from 'next';

import RootLayout from '../components/layout/root-layout/root-layout';
import { withStore } from '../utils/ssr';

const NewPostPage = (): ReactElement => {
    useEffect(() => {
        document.body.classList.add('new-post-page');
    }, []);

    return (
        <RootLayout>
            <NewPostPage />
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withStore();

export default NewPostPage;
