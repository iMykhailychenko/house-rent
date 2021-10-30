import React, { ChangeEvent, KeyboardEvent } from 'react';

import Close from '@mui/icons-material/Close';
import Search from '@mui/icons-material/Search';
import clsx from 'clsx';

import useTrans from '../../../hooks/trans.hook';

import css from './search-input.module.scss';

interface IProps {
    className?: string;
    value: string | number;
    placeholder?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string | number) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

const SearchInput = ({
    value,
    onBlur,
    onFocus,
    onChange,
    onSubmit,
    className,
    error = false,
    loading = false,
    disabled = false,
    placeholder = '',
}: IProps): JSX.Element => {
    const trans = useTrans();

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!onChange) return;
        onChange(event.target.value);
    };

    const reset = (): void => {
        if (!onChange) return;
        onChange('');
    };

    const submit = (): void => {
        if (!onSubmit) return;
        onSubmit(value);
    };

    const keypress = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Enter') {
            submit();
        }
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
                onKeyPress={keypress}
                className={css.input}
                placeholder={trans(placeholder)}
            />

            <button onClick={reset} className={clsx(css.reset, String(value).length < 2 && css.hidden)} type="button">
                <Close />
            </button>

            <button onClick={submit} className={css.btn} type="button">
                {loading ? <img className={css.spinner} src="/spinner.gif" alt="loading" /> : <Search />}
            </button>
        </div>
    );
};

export default SearchInput;
