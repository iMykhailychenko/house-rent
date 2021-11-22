import React from 'react';

import { GetServerSideProps } from 'next';

import PasswordForm from '../../components/common/auth/password-form/password-form';
import Meta from '../../components/meta/meta';
import AuthLayout from '../../components/pages/auth/layout/layout';
import { withStore } from '../../utils/ssr';

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

export const getServerSideProps: GetServerSideProps = withStore();

export default PasswordPage;
