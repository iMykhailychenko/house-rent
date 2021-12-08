import React from 'react';

import AuthRedirect from '../../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../../components/common/auth/get-static-profile/get-static-profile';
import RootLayout from '../../../components/layout/root-layout/root-layout';
import Meta from '../../../components/meta/meta';
import EditPost from '../../../components/pages/posts/edit/edit-post';

const EditPostPage = (): JSX.Element => {
    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta />
                <RootLayout withFooter={false}>
                    <EditPost />
                </RootLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default EditPostPage;
