import React, { ChangeEvent, ReactElement } from 'react';

import { Search } from '@material-ui/icons';
import clsx from 'clsx';

import useTrans from '../../../hooks/trans.hook';

import css from './search-input.module.scss';

interface IProps {
    className?: string;
    value: string | number;
    placeholder?: string;
    onChange?: (value: string) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: (value: string | number) => void;
    error?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

const SearchInput = ({
    value,
    onBlur,
    onFocus,
    onChange,
    className,
    error = false,
    loading = false,
    disabled = false,
    placeholder = '',
}: IProps): ReactElement => {
    const trans = useTrans();

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!onChange) return;
        onChange(event.target.value);
    };

    return (
        <div className={clsx(css.root, className, { [css.error]: error, [css.disabled]: disabled || loading || !onChange })}>
            <input
                type="text"
                value={value}
                onBlur={onBlur}
                autoComplete="on"
                onFocus={onFocus}
                onChange={handleChange}
                className={css.input}
                placeholder={trans(placeholder)}
            />

            <button className={css.reset} type="button">
                {loading ? <img className={css.spinner} src="/spinner.gif" alt="loading" /> : <Search />}
            </button>

            <button className={css.btn} type="button">
                {loading ? <img className={css.spinner} src="/spinner.gif" alt="loading" /> : <Search />}
            </button>
        </div>
    );
};

export default SearchInput;
