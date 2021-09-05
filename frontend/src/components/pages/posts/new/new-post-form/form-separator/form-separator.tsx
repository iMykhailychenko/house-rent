import React, { ReactElement } from 'react';

import useTrans from '../../../../../../hooks/trans.hook';

import css from './form-separator.module.scss';

interface IProps {
    children?: string;
}

const FormSeparator = ({ children }: IProps): ReactElement => {
    const trans = useTrans();
    return (
        <div className={css.root}>
            {children && <h5 className={css.title}>{trans(children)}</h5>}
            <span className={css.hr} />
        </div>
    );
};

export default FormSeparator;
