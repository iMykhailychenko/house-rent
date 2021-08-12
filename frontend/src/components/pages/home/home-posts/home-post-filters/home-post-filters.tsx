import React, { ReactElement } from 'react';

import CardSizeSwitcher from '../../../../common/card-size-switcher/card-size-switcher';
import HomePostChips from './home-post-chips/home-post-chips';
import css from './home-post-filters.module.scss';

const HomePostFilters = (): ReactElement => {
    return (
        <aside className={css.root}>
            <div className={css.sticky}>
                <div className={css.scrollBox}>
                    <CardSizeSwitcher />
                    <HomePostChips />
                </div>
            </div>
        </aside>
    );
};

export default HomePostFilters;
