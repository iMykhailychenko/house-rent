import React from 'react';

import { GetServerSideProps } from 'next';

import ResetForm from '../../components/common/auth/reset-form/reset-form';
import Meta from '../../components/meta/meta';
import AuthLayout from '../../components/pages/auth/layout/layout';
import { withAuthRedirect } from '../../utils/ssr';

const ResetPage = (): JSX.Element => (
    <>
        <Meta />
        <AuthLayout src="reset">
            <ResetForm />
        </AuthLayout>
    </>
);

export const getServerSideProps: GetServerSideProps = withAuthRedirect(null, true);

export default ResetPage;
