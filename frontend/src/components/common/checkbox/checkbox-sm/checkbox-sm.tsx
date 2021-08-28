import React, { ReactElement } from 'react';

import { Checkbox } from '@material-ui/core';
import clsx from 'clsx';

import css from './checkbox-sm.module.scss';

interface IProps {
    error?: boolean;
    name?: string;
    title: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const CheckboxSm = ({ error = false, title, name, value, onChange }: IProps): ReactElement => {
    const handleClick = (): void => {
        onChange(!value);
    };

    return (
        <button className={clsx(css.root, error && css.error)} onClick={handleClick} type="button">
            <Checkbox className={css.checkbox} checked={value} color="primary" inputProps={{ 'aria-label': title }} name={name} />
            <span className={css.text}>{title}</span>
        </button>
    );
};

export default CheckboxSm;
