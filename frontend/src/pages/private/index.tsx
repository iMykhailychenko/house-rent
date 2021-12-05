import React from 'react';

import Container from '../../components/layout/container/container';
import PrivateLayout from '../../components/layout/private-layout/private-layout';
import Meta from '../../components/meta/meta';
import PrivateComponent from '../../components/pages/private/private';

import css from './private.module.scss';

const PrivatePage = (): JSX.Element => {
    return (
        <>
            <Meta />
            <PrivateLayout>
                <Container className={css.root} size="md">
                    <PrivateComponent />
                </Container>
            </PrivateLayout>
        </>
    );
};

export default PrivatePage;
