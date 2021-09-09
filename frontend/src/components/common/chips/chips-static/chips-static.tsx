import React, { ReactElement } from 'react';

import css from './chips-static.module.scss';

interface IProps {
    list: string[];
}

const ChipsStatic = ({ list }: IProps): ReactElement => {
    return (
        <ul className={css.list}>
            {list.map(item => (
                <li key={item} className={css.chip}>
                    {item}
                </li>
            ))}
        </ul>
    );
};

export default ChipsStatic;
