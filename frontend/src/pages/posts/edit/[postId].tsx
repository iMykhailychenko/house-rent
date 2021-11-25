import React from 'react';

import { GetServerSideProps } from 'next';

import RootLayout from '../../../components/layout/root-layout/root-layout';
import Meta from '../../../components/meta/meta';
import EditPost from '../../../components/pages/posts/edit/edit-post';
import { withStore } from '../../../utils/ssr';

const EditPostPage = (): JSX.Element => {
    return (
        <>
            <Meta />
            <RootLayout withFooter={false}>
                <EditPost />
            </RootLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withStore();

export default EditPostPage;
