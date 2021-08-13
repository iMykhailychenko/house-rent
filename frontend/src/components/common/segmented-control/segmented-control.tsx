import clsx from 'clsx';
import React, { ReactElement } from 'react';

import css from './segmented-control.module.scss';

interface SegmentedControlItemProps {
    active: string;
    value: { id: string; name: string };
    onChange: (value: string) => void;
}

const SegmentedControlItem = ({ active, value, onChange }: SegmentedControlItemProps): ReactElement => {
    const handleClick = (): void => {
        onChange(value.id);
    };

    return (
        <li className={clsx(css.item, active === value.id && css.active)}>
            <button onClick={handleClick} type="button">
                {value.name}
            </button>
        </li>
    );
};

interface IProps {
    active: string;
    value: { id: string; name: string }[];
    onChange: (value: string) => void;
    className?: string;
}

const SegmentedControl = ({ active, value, onChange, className }: IProps): ReactElement => {
    return (
        <div className={clsx(css.wrapper, className)}>
            <ul className={css.list}>
                {value.map<ReactElement>(item => (
                    <SegmentedControlItem key={item.id} active={active} value={item} onChange={onChange} />
                ))}
            </ul>
        </div>
    );
};

export default SegmentedControl;
