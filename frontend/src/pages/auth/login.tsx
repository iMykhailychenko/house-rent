import React from 'react';

import { GetServerSideProps } from 'next';

import LoginForm from '../../components/common/auth/login-form/login-form';
import AuthLayout from '../../components/pages/auth/layout/layout';
import { withAuthRedirect } from '../../utils/ssr';

const LoginPage = (): JSX.Element => (
    <AuthLayout src="login">
        <LoginForm />
    </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = withAuthRedirect(null, true);

export default LoginPage;
