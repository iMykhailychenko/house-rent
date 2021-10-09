import React, { ChangeEvent, FocusEvent, KeyboardEvent, ReactElement, useState } from 'react';

import HelpOutline from '@mui/icons-material/HelpOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import clsx from 'clsx';

import useTrans from '../../../hooks/trans.hook';
import Button from '../button/button';
import Tooltip from '../tooltip/tooltip';

import css from './input.module.scss';

interface IProps {
    value: string | number;
    defaultValue?: string | number;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
    id?: string;
    className?: string;
    rootClassName?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    error?: string | boolean;
    readOnly?: boolean;
    autoComplete?: string;
    label?: string;
    info?: ReactElement | string;
}

const Input = ({
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    id,
    className,
    rootClassName,
    name,
    type = 'text',
    placeholder = '',
    error,
    readOnly,
    autoComplete,
    label,
    info,
}: IProps): ReactElement => {
    const trans = useTrans();
    const [show, setShow] = useState<string>(type);

    const handleClick = (): void => {
        setShow(value => (value === 'password' ? 'text' : 'password'));
    };

    return (
        <div className={clsx(css.root, rootClassName)}>
            {label && (
                <label className={css.label} htmlFor={id}>
                    <span>{label}</span>
                    {info && (
                        <Tooltip content={info}>
                            <HelpOutline />
                        </Tooltip>
                    )}
                </label>
            )}
            <div className={css.inner}>
                <Tooltip content={error} withMobile>
                    <input
                        id={id}
                        value={value}
                        onChange={onChange}
                        defaultValue={defaultValue}
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
