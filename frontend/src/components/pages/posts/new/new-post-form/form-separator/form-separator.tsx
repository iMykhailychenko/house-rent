import React from 'react';

import useTrans from '../../../../../../hooks/trans.hook';

import css from './form-separator.module.scss';

interface IProps {
    children?: string;
}

const FormSeparator = ({ children }: IProps): JSX.Element => {
    const trans = useTrans();
    return (
        <div className={css.root}>
            {children && <h5 className={css.title}>{trans(children)}</h5>}
            <span className={css.hr} />
        </div>
    );
};

export default FormSeparator;
