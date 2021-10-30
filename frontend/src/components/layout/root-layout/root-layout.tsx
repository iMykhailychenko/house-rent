import React from 'react';

import clsx from 'clsx';

import AppFooter from '../footer/footer';
import AppHeader from '../header/header';

import css from './root-layout.module.scss';

interface IProps {
    withHeader?: boolean;
    withFooter?: boolean;
    className?: string;
    children: JSX.Element[] | JSX.Element;
}

const RootLayout = ({ children, className, withHeader = true, withFooter = true }: IProps): JSX.Element => {
    return (
        <>
            {withHeader && <AppHeader />}
            <main className={clsx(css.root, className)}>{children}</main>
            {withFooter && <AppFooter />}
        </>
    );
};

export default RootLayout;
