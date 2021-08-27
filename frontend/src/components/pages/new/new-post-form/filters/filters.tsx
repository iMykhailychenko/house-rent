import React, { ReactElement } from 'react';

import clsx from 'clsx';

import Checkbox from '../../../../common/checkbox/checkbox';

import css from './filters.module.scss';

interface IProps {
    size?: 'sm' | 'lg';
    all: string[];
    name: string;
    value: string[];
    onChange: (name: string, value: string[]) => void;
}

const Filters = ({ size = 'sm', all, name, value, onChange }: IProps): ReactElement => {
    const handleChange = (item: string) => (active: boolean) => {
        onChange(name, active ? [...value, item] : value.filter(element => element !== item));
    };

    return (
        <div className={clsx({ [css.flex]: size === 'lg', [css.list]: size === 'sm' })}>
            {all.map(item => (
                <Checkbox size={size} key={item} title={item} value={value.includes(item)} onChange={handleChange(item)} />
            ))}
        </div>
    );
};

export default Filters;
