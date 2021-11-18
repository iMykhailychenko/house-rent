import React, { useState } from 'react';

import Home from '@mui/icons-material/Home';

import useAuth from '../../../hooks/auth.hook';
import routes from '../../../utils/routes';
import Link from '../../common/link/link';
import MenuIcon from '../../common/menu-icon/menu-icon';
import SwitchTheme from '../../common/switch-theme/switch-theme';
import AppDrawer from '../app-drawer/app-drawer';
import Container from '../container/container';

import HeaderAuth from './header-auth/header-auth';
import HeaderLanguage from './header-language/header-language';
import HeaderUser from './header-user/header-user';
import css from './header.module.scss';

interface IProps {
    withTheme?: boolean;
}

const AppHeader = ({ withTheme = true }: IProps): JSX.Element => {
    const [token] = useAuth();
    const [drawer, setDrawer] = useState(false);

    const handleClose = (): void => setDrawer(false);
    const handleOpen = (): void => setDrawer(true);

    return (
        <>
            <header id="header" className={css.header}>
                <Container className={css.inner} size="md">
                    <div className={css.item}>
                        <Link className={css.home} href={routes.home} type="button" secondary>
                            <Home />
                        </Link>
                        <MenuIcon className={css.menu} onClick={handleOpen} />
                        <HeaderLanguage />
                    </div>

                    <div className={css.item}>
                        {withTheme && <SwitchTheme />}
                        {token?.accessToken ? <HeaderUser /> : <HeaderAuth />}
                    </div>
                </Container>
            </header>
            <AppDrawer open={drawer} onClose={handleClose} />
        </>
    );
};

export default AppHeader;
