import React from 'react';

import { GetServerSideProps } from 'next';

import Container from '../../components/layout/container/container';
import PrivateLayout from '../../components/layout/private-layout/private-layout';
import { withAuthRedirect } from '../../utils/ssr';

const Private = (): JSX.Element => {
    return (
        <PrivateLayout>
            <Container size="lg">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere quisquam tempora vero vitae? A animi, aperiam
                consequuntur dicta, expedita id ipsa iure necessitatibus neque nesciunt quo ratione similique tenetur veritatis?
            </Container>
        </PrivateLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect();

export default Private;
