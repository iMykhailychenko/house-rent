import React, { ReactElement } from 'react';

import clsx from 'clsx';

import css from './switch-sm.module.scss';

interface IProps {
    value: boolean;
    onChange?: (value: boolean) => void;
    className?: string;
}

const SwitchSm = ({ value, onChange, className }: IProps): ReactElement => {
    const handleClick = (): void => {
        if (onChange) onChange(!value);
    };
    return (
        <button className={clsx(css.root, !value && css.right, className)} type="button" onClick={handleClick}>
            <span className={css.indicator} />
        </button>
    );
};

export default SwitchSm;
