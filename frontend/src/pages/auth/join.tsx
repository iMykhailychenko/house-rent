import React from 'react';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import JoinForm from '../../components/common/auth/join-form/join-form';
import Meta from '../../components/meta/meta';
import AuthLayout from '../../components/pages/auth/layout/layout';

const JoinPage = (): JSX.Element => (
    <AuthRedirect reverse={true}>
        <Meta />
        <AuthLayout src="join">
            <JoinForm />
        </AuthLayout>
    </AuthRedirect>
);

export default JoinPage;
