import React from 'react';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import LoginForm from '../../components/common/auth/login-form/login-form';
import Meta from '../../components/meta/meta';
import AuthLayout from '../../components/pages/auth/layout/layout';

const LoginPage = (): JSX.Element => (
    <AuthRedirect reverse={true}>
        <Meta />
        <AuthLayout src="login">
            <LoginForm />
        </AuthLayout>
    </AuthRedirect>
);

export default LoginPage;
