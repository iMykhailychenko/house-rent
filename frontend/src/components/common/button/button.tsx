import clsx from 'clsx';
import React, { MouseEvent, ReactElement } from 'react';

import css from './button.module.scss';

interface IProps {
    loading?: boolean;
    className?: string;
    primary?: boolean;
    secondary?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    children: ReactElement[] | ReactElement | string;
}

const Button = ({ type = 'button', className, loading, onClick, children, primary, secondary }: IProps): ReactElement => {
    return (
        <button
            className={clsx(css.button, className, {
                [css.loading]: loading,
                [css.primary]: primary,
                [css.secondary]: secondary,
            })}
            type={type}
            onClick={onClick}
        >
            {loading && <img className={css.spinner} src="/spinner.gif" alt="" />}
            <span className={css.children}>{children}</span>
        </button>
    );
};

export default Button;
