import React, { ReactElement } from 'react';

import SwitchTheme from '../../common/switch-theme/switch-theme';
import Container from '../container/container';
import css from './header.module.scss';

const AppHeader = (): ReactElement => {
    return (
        <header className={css.header}>
            <Container>
                <div className={css.inner}>
                    <SwitchTheme className={css.theme} />
                </div>
            </Container>
        </header>
    );
};

export default AppHeader;
