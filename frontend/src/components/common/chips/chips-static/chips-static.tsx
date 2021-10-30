import React from 'react';

import clsx from 'clsx';

import Tooltip from '../../tooltip/tooltip';

import css from './chips-static.module.scss';

interface IProps {
    chip: string | number;
    active?: boolean;
    tooltip: string;
    children?: JSX.Element;
}

const ChipsStatic = ({ children, active = false, chip, tooltip }: IProps): JSX.Element => {
    return (
        <div className={clsx(css.chip, { [css.active]: active })}>
            <Tooltip className={css.tooltip} content={tooltip}>
                <div className={css.inner}>
                    {children}
                    <p>{chip}</p>
                </div>
            </Tooltip>
        </div>
    );
};

export default ChipsStatic;
