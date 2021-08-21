import React, { ReactElement } from 'react';

import MenuIcon from '../../common/menu-icon/menu-icon';
import SwitchTheme from '../../common/switch-theme/switch-theme';
import Container from '../container/container';

import HeaderAuth from './header-auth/header-auth';
import HeaderLanguage from './header-language/header-language';
import css from './header.module.scss';

const AppHeader = (): ReactElement => {
    return (
        <header className={css.header}>
            <Container className={css.inner} size="md">
                <div className={css.item}>
                    <MenuIcon className={css.menu} />
                    <HeaderLanguage />
                </div>

                <div className={css.item}>
                    <SwitchTheme />
                    <HeaderAuth />
                </div>
            </Container>
        </header>
    );
};

export default AppHeader;
