import React from 'react';

import { GetServerSideProps } from 'next';

import PasswordForm from '../../components/common/auth/password-form/password-form';
import Meta from '../../components/meta/meta';
import AuthLayout from '../../components/pages/auth/layout/layout';
import { withAuthRedirect } from '../../utils/ssr';

const PasswordPage = (): JSX.Element => {
    return (
        <>
            <Meta />
            <AuthLayout src="reset">
                <PasswordForm />
            </AuthLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect(null, true);

export default PasswordPage;
