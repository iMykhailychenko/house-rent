import React, { ReactElement } from 'react';

import Container from '../container/container';

import css from './footer.module.scss';

const AppFooter = (): ReactElement => {
    return (
        <footer className={css.footer}>
            <Container>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae nobis
                odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
            </Container>
        </footer>
    );
};

export default AppFooter;
