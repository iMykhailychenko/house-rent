import React from 'react';

import clsx from 'clsx';

import css from './switch-lg.module.scss';

interface IProps {
    value: boolean;
    onChange?: (value: boolean) => void;
    labels?: [string, string];
    className?: string;
    width?: number;
}

const SwitchLg = ({ value, onChange, labels = ['on', 'off'], className, width = 5 }: IProps): JSX.Element => {
    const handleClick = (): void => {
        if (onChange) onChange(!value);
    };
    return (
        <button className={clsx(css.root, !value && css.right, className)} type="button" onClick={handleClick}>
            <span className={clsx(value && 'active')} style={{ minWidth: `${width}rem` }}>
                {labels[0]}
            </span>
            <span className={clsx(!value && 'active')} style={{ minWidth: `${width}rem` }}>
                {labels[1]}
            </span>
        </button>
    );
};

export default SwitchLg;
