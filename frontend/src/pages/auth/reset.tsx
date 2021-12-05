import React from 'react';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import ResetForm from '../../components/common/auth/reset-form/reset-form';
import Meta from '../../components/meta/meta';
import AuthLayout from '../../components/pages/auth/layout/layout';

const ResetPage = (): JSX.Element => (
    <AuthRedirect reverse={true}>
        <Meta />
        <AuthLayout src="reset">
            <ResetForm />
        </AuthLayout>
    </AuthRedirect>
);

export default ResetPage;
