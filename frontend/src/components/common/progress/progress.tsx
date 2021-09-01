import React, { ReactElement } from 'react';

import css from './progress.module.scss';

interface IProps {
    number: number;
}

const Progress = ({ number }: IProps): ReactElement => {
    return (
        <div className={css.root}>
            <span className={css.number}>{number}%</span>
            <div style={{ width: `${number}%` }} className={css.bar} />
        </div>
    );
};

export default Progress;
