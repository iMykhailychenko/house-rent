import clsx from 'clsx';
import React, { ReactElement, useEffect, useRef } from 'react';

import useTrans from '../../../hooks/trans.hook';
import { IChips, IChipsMap } from '../../../interfaces';
import css from './chips.module.scss';

interface IChipsItemProps {
    chip: IChips;
    onChange: (value: IChips) => void;
}

const ChipsItem = ({ chip, onChange }: IChipsItemProps): ReactElement => {
    const trans = useTrans();
    const ref = useRef<HTMLButtonElement>(null);
    const handleClick = (): void => onChange({ ...chip, active: !chip.active });

    useEffect(() => {
        if (ref.current && chip.hover) {
            ref.current.style.setProperty('--hover', chip.hover);
        }
    }, [ref, chip.hover]);

    return (
        <button ref={ref} type="button" onClick={handleClick} className={clsx(css.chip, chip.active && css.active)}>
            {chip.icon}
            <span className={css.text}>{trans(chip.name)}</span>
        </button>
    );
};

interface IProps {
    chips: IChipsMap;
    onChange: (value: IChips) => void;
}

const Chips = ({ chips, onChange }: IProps): ReactElement => (
    <div className={css.flex}>
        {Object.values(chips).map<ReactElement>(chip => (
            <ChipsItem key={chip.name} chip={chip} onChange={onChange} />
        ))}
    </div>
);

export default Chips;
