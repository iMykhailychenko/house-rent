import { Header } from 'antd/lib/layout/layout';
import React, { ReactElement } from 'react';

import css from './header.module.scss';

const AppHeader = (): ReactElement => {
    return <Header className={css.header}>Header</Header>;
};

export default AppHeader;
