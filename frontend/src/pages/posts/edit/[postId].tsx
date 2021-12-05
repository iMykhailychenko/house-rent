import React from 'react';

import RootLayout from '../../../components/layout/root-layout/root-layout';
import Meta from '../../../components/meta/meta';
import EditPost from '../../../components/pages/posts/edit/edit-post';

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

export default EditPostPage;
