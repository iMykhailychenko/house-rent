import React, { ChangeEvent, FocusEvent, KeyboardEvent, ReactElement, useState } from 'react';

import { Visibility, VisibilityOff } from '@material-ui/icons';
import clsx from 'clsx';

import useTrans from '../../../hooks/trans.hook';
import Button from '../button/button';
import Tooltip from '../tooltip/tooltip';

import css from './input.module.scss';

interface IProps {
    value: string | number;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    id?: string;
    className?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    error?: string | boolean;
    readOnly?: boolean;
    autoComplete?: string;
    min?: string;
    max?: string;
    label?: string;
}

const Input = ({
    value,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    id,
    className,
    name,
    type = 'text',
    placeholder = '',
    error,
    readOnly,
    autoComplete,
    min,
    max,
    label,
}: IProps): ReactElement => {
    const trans = useTrans();
    const [show, setShow] = useState<string>(type);

    const handleClick = (): void => {
        setShow(value => (value === 'password' ? 'text' : 'password'));
    };

    return (
        <div className={css.root}>
            {label && (
                <label className={css.label} htmlFor={id}>
                    {label}
                </label>
            )}
            <div className={css.inner}>
                <Tooltip content={error} withMobile>
                    <input
                        id={id}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onKeyDown={onKeyDown}
                        className={clsx(css.input, className, {
                            [css.password]: type === 'password',
                            [css.error]: error,
                        })}
                        placeholder={trans(placeholder)}
                        name={name}
                        type={show}
                        readOnly={readOnly}
                        autoComplete={autoComplete}
                        min={min}
                        max={max}
                    />
                </Tooltip>
                {type === 'password' && (
                    <Button className={css.button} secondary onClick={handleClick}>
                        {show === 'password' ? <VisibilityOff /> : <Visibility />}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Input;
