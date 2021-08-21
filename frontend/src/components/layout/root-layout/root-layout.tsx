import React, { ReactElement } from 'react';

import AppFooter from '../footer/footer';
import AppHeader from '../header/header';

interface IProps {
    children: ReactElement[] | ReactElement;
}

const RootLayout = ({ children }: IProps): ReactElement => {
    return (
        <>
            <AppHeader />
            {children}
            <AppFooter />
        </>
    );
};

export default RootLayout;
