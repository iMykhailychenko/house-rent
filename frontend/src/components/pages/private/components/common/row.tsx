import React from 'react';

import css from './common.module.scss';

interface IProps {
    children: JSX.Element[] | JSX.Element | string;
}

const Row = ({ children }: IProps): JSX.Element => {
    return <div className={css.row}>{children}</div>;
};

export default Row;
