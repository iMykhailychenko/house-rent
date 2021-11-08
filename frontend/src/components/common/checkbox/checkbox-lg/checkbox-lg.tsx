import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import clsx from 'clsx';

import css from './checkbox-lg.module.scss';

interface IProps {
    className?: string;
    error?: boolean;
    name?: string;
    title: string;
    small?: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const CheckboxLg = ({ className, error = false, name, title, small, value, onChange }: IProps): JSX.Element => {
    const handleClick = (): void => onChange(!value);

    return (
        <button
            className={clsx(css.root, className, error && css.error, value && css.active)}
            onClick={handleClick}
            type="button"
        >
            <div className={css.checkbox}>
                <Checkbox className={css.icon} checked={value} color="primary" inputProps={{ 'aria-label': title }} name={name} />
            </div>
            <p>
                <span className={css.title}>{title}</span>
                <span className={css.text}>{small}</span>
            </p>
        </button>
    );
};

export default CheckboxLg;
