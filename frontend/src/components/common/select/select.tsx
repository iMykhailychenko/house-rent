import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';

import useTrans from '../../../hooks/trans.hook';
import { SelectList, SelectValue } from '../../../interfaces';

import css from './select.module.scss';

interface SelectItemProps {
    children: string;
    value: SelectValue;
    onClose: () => void;
    onChange: (value: SelectValue) => void;
}

const SelectItem = ({ children, value, onClose, onChange }: SelectItemProps): JSX.Element => {
    const handleClick = (): void => {
        onChange(value);
        onClose();
    };

    return (
        <MenuItem className={css.item} onClick={handleClick}>
            {children}
        </MenuItem>
    );
};

interface IProps {
    error?: boolean;
    className?: string;
    placeholder?: string;
    list: SelectList;
    value?: SelectValue;
    onChange: (value: SelectValue) => void;
}

const Select = ({ error = false, className, placeholder = '', list, value, onChange }: IProps): JSX.Element => {
    const trans = useTrans();

    const [open, setOpen] = useState(false);
    const handleToggle = (): void => setOpen(prev => !prev);
    const handleClose = (): void => {
        setTimeout(() => {
            setOpen(false);
        }, 100);
    };

    return (
        <button className={clsx(css.root, className, open && css.open)} type="button" onBlur={handleClose}>
            <p className={clsx(css.input, error && css.error)} onClick={handleToggle} aria-hidden="true">
                <span className={clsx(css.text, { [css.placeholder]: !value?.value && placeholder })}>
                    {trans(value?.value || placeholder)}
                </span>
                <span className={css.icon} />
            </p>

            <CSSTransition in={open} timeout={200} unmountOnExit>
                <ul className={css.list}>
                    {list.map(item => (
                        <SelectItem onChange={onChange} onClose={handleClose} value={item} key={item.id}>
                            {trans(item.value)}
                        </SelectItem>
                    ))}
                </ul>
            </CSSTransition>
        </button>
    );
};

export default Select;
