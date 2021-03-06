import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import clsx from 'clsx';

import css from './checkbox-sm.module.scss';

interface IProps {
    className?: string;
    error?: boolean;
    name?: string;
    title: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const CheckboxSm = ({ className, error = false, title, name, value, onChange }: IProps): JSX.Element => {
    const handleClick = (): void => {
        onChange(!value);
    };

    return (
        <button className={clsx(css.root, className, error && css.error)} onClick={handleClick} type="button">
            <Checkbox className={css.checkbox} checked={value} color="primary" inputProps={{ 'aria-label': title }} name={name} />
            <span className={css.text}>{title}</span>
        </button>
    );
};

export default CheckboxSm;
