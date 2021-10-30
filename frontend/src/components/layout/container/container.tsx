import React from 'react';

import clsx from 'clsx';

import css from './container.module.scss';

interface IProps {
    id?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    children: JSX.Element[] | JSX.Element | string;
}

const Container = ({ id, className, size = 'lg', children }: IProps): JSX.Element => {
    return (
        <div id={id} className={clsx(className, css[size], css.root)}>
            {children}
        </div>
    );
};

export default Container;
