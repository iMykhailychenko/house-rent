import React, { ReactElement } from 'react';

import Container from '../../../layout/container/container';
import css from './home-banner.module.scss';

const HomeBanner = (): ReactElement => {
    return (
        <Container className={css.root}>
            <div className={css.inner}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae nobis
                odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
            </div>
        </Container>
    );
};

export default HomeBanner;
