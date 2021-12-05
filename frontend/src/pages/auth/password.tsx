import React from 'react';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import PasswordForm from '../../components/common/auth/password-form/password-form';
import Meta from '../../components/meta/meta';
import AuthLayout from '../../components/pages/auth/layout/layout';

const PasswordPage = (): JSX.Element => {
    return (
        <AuthRedirect reverse={true}>
            <Meta />
            <AuthLayout src="reset">
                <PasswordForm />
            </AuthLayout>
        </AuthRedirect>
    );
};

export default PasswordPage;
