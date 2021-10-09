import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import { withAuthRedirect } from '../../utils/ssr';

const Private = (): ReactElement => {
    return (
        <RootLayout>
            <Container size="lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere quisquam tempora vero vitae? A animi, aperiam
                consequuntur dicta, expedita id ipsa iure necessitatibus neque nesciunt quo ratione similique tenetur veritatis?
            </Container>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect();

export default Private;
