import React from 'react';

import { fontSize } from '@mui/system';

import { inspect } from 'util';

import useConfig from '../../../../../hooks/config.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { formatDate } from '../../../../../utils/helpers/date.helper';
import css from '../messages-layout.module.scss';

interface IProps {
    date: Date;
}
const DateSeparator = ({ date }: IProps): JSX.Element => {
    const trans = useTrans();
    const [config] = useConfig();
    const dateFontSize = config.chatFontSize + 0.2 + 'rem';

    return (
        <p style={{ fontSize: dateFontSize }} className={css.date}>
            {formatDate(date, trans)}
        </p>
    );
};

export default DateSeparator;
