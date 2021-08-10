import clsx from 'clsx';
import React, { ReactElement } from 'react';

import css from './container.module.scss';

interface IProps {
    id?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    children: ReactElement[] | ReactElement | string;
}

const Container = ({ id, className, size = 'lg', children }: IProps): ReactElement => {
    return (
        <div id={id} className={clsx(className, css[size], css.root)}>
            {children}
        </div>
    );
};

export default Container;
