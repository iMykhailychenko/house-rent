import React, { ReactElement } from 'react';

import { Checkbox } from '@material-ui/core';
import clsx from 'clsx';

import css from './checkbox-lg.module.scss';

interface IProps {
    error?: boolean;
    name?: string;
    title: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const CheckboxLg = ({ error = false, name, title, value, onChange }: IProps): ReactElement => {
    const handleClick = (): void => onChange(!value);

    return (
        <button className={clsx(css.root, error && css.error, value && css.active)} onClick={handleClick} type="button">
            <div className={css.checkbox}>
                <Checkbox className={css.icon} checked={value} color="primary" inputProps={{ 'aria-label': title }} name={name} />
            </div>
            <span className={css.text}>{title}</span>
        </button>
    );
};

export default CheckboxLg;
