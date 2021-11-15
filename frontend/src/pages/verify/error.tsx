import React from 'react';

import { GetServerSideProps } from 'next';

import RootLayout from '../../components/layout/root-layout/root-layout';
import { withAuthRedirect } from '../../utils/ssr';

const ErrorVerifyPage = (): JSX.Element => {
    return (
        <RootLayout>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae nobis
                odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
            </div>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect(null, true);

export default ErrorVerifyPage;
