import React from 'react';

import Button from '@mui/material/Button';
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
        <Button
            className={clsx(css.root, className, error && css.error, value && css.active)}
            onClick={handleClick}
            type="button"
        >
            <div className={css.checkbox}>
                <Checkbox className={css.icon} checked={value} color="primary" inputProps={{ 'aria-label': title }} name={name} />
            </div>
            <div>
                <p className={css.title}>{title}</p>
                <p className={css.text}>{small}</p>
            </div>
        </Button>
    );
};

export default CheckboxLg;
