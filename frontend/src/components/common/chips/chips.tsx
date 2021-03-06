import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import clsx from 'clsx';

import useTrans from '../../../hooks/trans.hook';
import { IChips, IChipsMap } from '../../../interfaces';
import filtersIconsMap from '../../../map/filters-icons.map';

import css from './chips.module.scss';

interface IChipsItemProps {
    chip: IChips;
    onChange: (value: IChips) => void;
}

const ChipsItem = ({ chip, onChange }: IChipsItemProps): JSX.Element => {
    const trans = useTrans();
    const ref = useRef<HTMLButtonElement>(null);
    const handleClick = (): void => onChange({ ...chip, active: !chip.active });

    useEffect(() => {
        if (ref.current && chip.hover) {
            ref.current.style.setProperty('--hover', chip.hover);
        }
    }, [ref, chip.hover]);

    return (
        <button
            ref={ref}
            type="button"
            onClick={handleClick}
            className={clsx(css.chip, chip.active && css.active)}
            title={trans(chip.name)}
        >
            {chip.icon && filtersIconsMap[chip.icon]}
            <span className={css.text}>{trans(chip.name)}</span>
        </button>
    );
};

interface IProps {
    chips: IChipsMap;
    onChange?: (value: string[]) => void;
}

const Chips = ({ chips, onChange }: IProps): JSX.Element => {
    const handleChange = useCallback(
        (value: IChips): void => {
            onChange &&
                onChange(
                    Object.values({ ...chips, [value.name]: value }).reduce<string[]>((acc, item) => {
                        if (item.active) acc.push(item.name);
                        return acc;
                    }, []),
                );
        },
        [chips, onChange],
    );

    const list = useMemo(
        () => (onChange ? Object.values(chips) : Object.values(chips).filter(item => item.active)),
        [chips, onChange],
    );

    return (
        <div className={clsx(css.flex, !onChange && css.readOnly)}>
            {list.map<JSX.Element>(chip => (
                <ChipsItem key={chip.name} chip={chip} onChange={handleChange} />
            ))}
        </div>
    );
};

export default Chips;
