import React, { ReactElement } from 'react';

import Checkbox from '@mui/material/Checkbox';
import clsx from 'clsx';

import css from './checkbox-lg.module.scss';

interface IProps {
    className?: string;
    error?: boolean;
    name?: string;
    title: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const CheckboxLg = ({ className, error = false, name, title, value, onChange }: IProps): ReactElement => {
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
            <span className={css.text}>{title}</span>
        </button>
    );
};

export default CheckboxLg;
