import React, { useEffect } from 'react';

import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import NewPostContainer from '../../components/pages/posts/new/new-post-container/new-post-container';
import routes from '../../utils/routes';

const NewPostPage = (): JSX.Element => {
    useEffect(() => {
        document.body.classList.add('new-post-page');
        return () => document.body.classList.remove('new-post-page');
    }, []);

    return (
        <GetStaticProfile>
            <Meta />
            <RootLayout href={routes.home} withFooter={false}>
                <NewPostContainer />
            </RootLayout>
        </GetStaticProfile>
    );
};

export default NewPostPage;
