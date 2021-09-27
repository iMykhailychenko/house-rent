import React, { ReactElement } from 'react';

import AppFooter from '../footer/footer';
import AppHeader from '../header/header';

import css from './root-layout.module.scss';

interface IProps {
    children: ReactElement[] | ReactElement;
}

const RootLayout = ({ children }: IProps): ReactElement => {
    return (
        <>
            <AppHeader />
            <main className={css.root}>{children}</main>
            <AppFooter />
        </>
    );
};

export default RootLayout;
