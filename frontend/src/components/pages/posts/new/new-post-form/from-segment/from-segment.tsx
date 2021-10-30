import React from 'react';

import useTrans from '../../../../../../hooks/trans.hook';

import css from './from-segment.module.scss';

interface IProps {
    id?: string;
    label: string;
    error?: string | string[] | boolean;
    required?: boolean;
    children: JSX.Element;
}

const FormSegment = ({ id, label, error, required = true, children }: IProps): JSX.Element => {
    const trans = useTrans();
    const requiredStar = required ? ' *' : '';

    return (
        <div className={css.root}>
            {id ? (
                <label className={css.label} htmlFor={id}>
                    {trans(label) + requiredStar}
                    {error && <span className={css.error}>{error}</span>}
                </label>
            ) : (
                <p className={css.label}>
                    {trans(label) + requiredStar}
                    {error && <span className={css.error}>{error}</span>}
                </p>
            )}

            <div className={css.inner}>{children}</div>
        </div>
    );
};

export default FormSegment;
