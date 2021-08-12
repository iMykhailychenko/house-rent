import React, { ReactElement } from 'react';

import { cityFilters, generalFilters, houseTypeFilters, priceFilters, roomFilters } from '../../../../config/filters.config';
import { SEARCH_FILTERS } from '../../../../interfaces';
import Chips from '../../chips/chips';
import css from './post-cart-chips.module.scss';

type ActiveChips = { [key in SEARCH_FILTERS]: string[] };

interface IProps {
    value: ActiveChips;
}

const PostCardChips = ({ value }: IProps): ReactElement => {
    return (
        <div className={css.root}>
            <Chips chips={generalFilters(value[SEARCH_FILTERS.GENERAL])} />

            <Chips chips={roomFilters(value[SEARCH_FILTERS.ROOM])} />

            <Chips chips={houseTypeFilters(value[SEARCH_FILTERS.HOUSE_TYPE])} />

            <Chips chips={priceFilters(value[SEARCH_FILTERS.PRICE])} />

            <Chips chips={cityFilters(value[SEARCH_FILTERS.CITY])} />
        </div>
    );
};

export default PostCardChips;
