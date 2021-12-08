import React from 'react';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import Container from '../../components/layout/container/container';
import PrivateLayout from '../../components/layout/private-layout/private-layout';
import Meta from '../../components/meta/meta';
import PrivateComponent from '../../components/pages/private/private';

import css from './private.module.scss';

const PrivatePage = (): JSX.Element => {
    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta />
                <PrivateLayout>
                    <Container className={css.root} size="md">
                        <PrivateComponent />
                    </Container>
                </PrivateLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default PrivatePage;
