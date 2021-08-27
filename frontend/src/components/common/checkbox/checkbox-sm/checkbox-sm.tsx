import React, { ReactElement } from 'react';

import { Checkbox } from '@material-ui/core';

import css from './checkbox-sm.module.scss';

interface IProps {
    name?: string;
    title: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const CheckboxSm = ({ title, name, value, onChange }: IProps): ReactElement => {
    const handleClick = (): void => {
        onChange(!value);
    };

    return (
        <button className={css.root} onClick={handleClick} type="button">
            <Checkbox className={css.checkbox} checked={value} color="primary" inputProps={{ 'aria-label': title }} name={name} />
            <span className={css.text}>{title}</span>
        </button>
    );
};

export default CheckboxSm;
