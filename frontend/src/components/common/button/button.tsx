import React, { MouseEvent, ReactElement } from 'react';

import clsx from 'clsx';

import css from './button.module.scss';

interface IProps {
    size?: 'sm' | 'md';
    loading?: boolean;
    className?: string;
    primary?: boolean;
    secondary?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactElement[] | ReactElement | string;
}

const Button = ({
    size = 'md',
    type = 'button',
    className,
    loading,
    onClick,
    children,
    primary,
    secondary,
    disabled = false,
}: IProps): ReactElement => (
    <button
        className={clsx(css.button, className, {
            [css.small]: size === 'sm',
            [css.loading]: loading,
            [css.primary]: primary && !disabled,
            [css.secondary]: secondary && !disabled,
            [css.disabled]: disabled,
        })}
        type={type}
        onClick={onClick}
    >
        {loading && <img className={css.spinner} src="/spinner.gif" alt="loading" />}
        <span className={css.children}>{children}</span>
    </button>
);

export default Button;
