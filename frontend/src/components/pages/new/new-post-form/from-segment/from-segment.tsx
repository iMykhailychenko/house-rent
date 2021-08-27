import React, { ReactElement } from 'react';

import css from './from-segment.module.scss';

interface IProps {
    id?: string;
    label: string;
    children: ReactElement;
}

const FormSegment = ({ id, label, children }: IProps): ReactElement => {
    return (
        <div className={css.root}>
            {id ? (
                <label className={css.label} htmlFor={id}>
                    {label}
                </label>
            ) : (
                <p className={css.label}>{label}</p>
            )}

            <div className={css.inner}>{children}</div>
        </div>
    );
};

export default FormSegment;
