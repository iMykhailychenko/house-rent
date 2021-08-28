import React, { ReactElement } from 'react';

import css from './from-segment.module.scss';

interface IProps {
    id?: string;
    label: string;
    error?: string | string[] | boolean;
    children: ReactElement;
}

const FormSegment = ({ id, label, error, children }: IProps): ReactElement => {
    return (
        <div className={css.root}>
            {id ? (
                <label className={css.label} htmlFor={id}>
                    {label}
                    {error && <span className={css.error}>{error}</span>}
                </label>
            ) : (
                <p className={css.label}>
                    {label}
                    {error && <span className={css.error}>{error}</span>}
                </p>
            )}

            <div className={css.inner}>{children}</div>
        </div>
    );
};

export default FormSegment;
