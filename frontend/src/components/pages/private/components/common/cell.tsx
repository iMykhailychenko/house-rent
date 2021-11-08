import React from 'react';

import css from './common.module.scss';

interface IProps {
    children: JSX.Element[] | JSX.Element | string;
}

const Cell = ({ children }: IProps): JSX.Element => {
    return <div className={css.cell}>{children}</div>;
};

export default Cell;
