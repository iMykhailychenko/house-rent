import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import JoinForm from '../../components/common/auth/join-form/join-form';
import AuthLayout from '../../components/pages/auth/layout/layout';
import { withAuthRedirect } from '../../utils/ssr';

const JoinPage = (): ReactElement => (
    <AuthLayout src="join">
        <JoinForm />
    </AuthLayout>
);

export const getServerSideProps: GetServerSideProps = withAuthRedirect(null, true);

export default JoinPage;
