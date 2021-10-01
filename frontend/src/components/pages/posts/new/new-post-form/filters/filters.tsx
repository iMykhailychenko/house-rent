import React, { ReactElement } from 'react';

import clsx from 'clsx';

import useTrans from '../../../../../../hooks/trans.hook';
import Checkbox from '../../../../../common/checkbox/checkbox';

import css from './filters.module.scss';

interface IProps {
    error?: boolean;
    size?: 'sm' | 'lg';
    all: string[];
    name: string;
    value: string[];
    onChange: (name: string, value: string[]) => void;
}

const Filters = ({ error = false, size = 'sm', all, name, value, onChange }: IProps): ReactElement => {
    const trans = useTrans();

    const handleChange = (item: string) => (active: boolean) => {
        onChange(name, active ? [...value, item] : value.filter(element => element !== item));
    };

    return (
        <div className={clsx({ [css.flex]: size === 'lg', [css.list]: size === 'sm' })}>
            {all.map(item => (
                <Checkbox
                    key={item}
                    size={size}
                    title={trans(item)}
                    error={error}
                    value={value.includes(item)}
                    onChange={handleChange(item)}
                />
            ))}
        </div>
    );
};

export default Filters;
