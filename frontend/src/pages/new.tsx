import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import RootLayout from '../components/layout/root-layout/root-layout';
import NewPostForm from '../components/pages/new/new-post-form/new-post-form';
import { withStore } from '../utils/ssr';

const NewPostPage = (): ReactElement => {
    return (
        <RootLayout>
            <NewPostForm />
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withStore();

export default NewPostPage;
