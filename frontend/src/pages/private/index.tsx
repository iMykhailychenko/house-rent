import React from 'react';

import { GetServerSideProps } from 'next';

import Container from '../../components/layout/container/container';
import PrivateLayout from '../../components/layout/private-layout/private-layout';
import PrivateComponent from '../../components/pages/private/private';
import { withAuthRedirect } from '../../utils/ssr';

import css from './private.module.scss';

const PrivatePage = (): JSX.Element => {
    return (
        <PrivateLayout>
            <Container className={css.root} size="md">
                <PrivateComponent />
            </Container>
        </PrivateLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect();

export default PrivatePage;
