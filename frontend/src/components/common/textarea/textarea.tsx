import React, { ChangeEvent, FocusEvent, KeyboardEvent, ReactElement } from 'react';

import HelpOutline from '@mui/icons-material/HelpOutline';
import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';

import useTrans from '../../../hooks/trans.hook';
import Tooltip from '../tooltip/tooltip';

import css from './textarea.module.scss';

interface IProps {
    value: string | number;
    defaultValue?: string | number;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
    id?: string;
    title?: string;
    className?: string;
    rootClassName?: string;
    name?: string;
    placeholder?: string;
    error?: string | boolean;
    readOnly?: boolean;
    label?: string;
    info?: ReactElement | string;
}

const Textarea = ({
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
    placeholder = '',
    title,
    error,
    readOnly,
    label,
    info,
}: IProps): ReactElement => {
    const trans = useTrans();

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
                    <TextareaAutosize
                        id={id}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onKeyDown={onKeyDown}
                        className={clsx(css.textarea, className, {
                            [css.error]: error,
                        })}
                        placeholder={trans(placeholder)}
                        name={name}
                        readOnly={readOnly}
                        wrap="soft"
                        title={title}
                    />
                </Tooltip>
            </div>
        </div>
    );
};

export default Textarea;
