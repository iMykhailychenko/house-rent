import React, { ReactElement } from 'react';

import Container from '../container/container';
import css from './header.module.scss';

const AppHeader = (): ReactElement => {
    return (
        <header className={css.header}>
            <Container>
                <div className={css.inner}>Header</div>
            </Container>
        </header>
    );
};

export default AppHeader;
