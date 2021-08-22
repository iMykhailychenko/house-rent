import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import { withAuthRedirect } from '../../../utils/ssr';

const AuthSuccessPage = (): ReactElement => {
    return (
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae nobis
            odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect(null, true);

export default AuthSuccessPage;
