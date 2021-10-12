import React, { ReactElement } from 'react';

import useTrans from '../../../../../hooks/trans.hook';
import { formatDate } from '../../../../../utils/helpers';
import css from '../messages-layout.module.scss';

interface IProps {
    date: Date;
}
const DateSeparator = ({ date }: IProps): ReactElement => {
    const trans = useTrans();
    return <p className={css.date}>{formatDate(date, trans)}</p>;
};

export default DateSeparator;
