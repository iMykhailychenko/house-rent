import React, { ReactElement, useState } from 'react';

import Chips, { IChips, IChipsMap } from '../../../../../common/chips/chips';
import filtersChips from './home-post-chips.config';
import css from './home-post-chips.module.scss';

const HomePostChips = (): ReactElement => {
    const [chips, setChips] = useState<IChipsMap>(filtersChips);

    const handleChange = (value: IChips): void => {
        setChips(prev => ({ ...prev, [value.name]: value }));
    };

    return (
        <div className={css.root}>
            <Chips onChange={handleChange} chips={chips} />
        </div>
    );
};

export default HomePostChips;
