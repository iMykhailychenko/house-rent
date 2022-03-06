import React, { useState } from 'react';

import clsx from 'clsx';
import dynamic from 'next/dynamic';

import AppDrawer from '../app-drawer/app-drawer';
import AppFooter from '../footer/footer';
import AppHeader from '../header/header';
import SubHeader from '../header/sub-header/sub-header';

import css from './root-layout.module.scss';

const BannerComponent = dynamic(() => import('../../common/banner/banner'), { ssr: false });

interface IProps {
    withHeader?: boolean;
    withFooter?: boolean;

    className?: string;
    backBtnHref?: string;
    backBtnTitle?: string;
    children: JSX.Element[] | JSX.Element;
}

const RootLayout = ({
    backBtnHref,
    backBtnTitle,
    children,
    className,
    withHeader = true,
    withFooter = true,
}: IProps): JSX.Element => {
    const [drawer, setDrawer] = useState(false);
    const handleDrawerClose = (): void => setDrawer(false);
    const handleDrawerToggle = (): void => setDrawer(prev => !prev);

    return (
        <>
            {withHeader && <AppHeader />}
            <div className={css.sticky}>
                <BannerComponent />
                <SubHeader onToggle={handleDrawerToggle} backBtnHref={backBtnHref} backBtnTitle={backBtnTitle} />
            </div>
            <AppDrawer open={drawer} onClose={handleDrawerClose} />

            <main className={clsx(css.root, className)}>{children}</main>

            {withFooter && <AppFooter />}
        </>
    );
};

export default RootLayout;
