import React, { MouseEvent } from 'react';

import MUIButton from '@mui/material/Button';
import clsx from 'clsx';

import css from './button.module.scss';

interface IProps {
    loading?: boolean;
    className?: string;
    primary?: boolean;
    secondary?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: JSX.Element[] | JSX.Element | string;
}

const Button = ({
    type = 'button',
    className,
    loading,
    onClick,
    children,
    primary,
    secondary,
    disabled = false,
}: IProps): JSX.Element => (
    <MUIButton
        className={clsx(css.button, className, {
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
    </MUIButton>
);

export default Button;
