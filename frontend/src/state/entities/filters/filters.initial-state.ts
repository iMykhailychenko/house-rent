import {
    districtFilters,
    generalFilters,
    houseTypeFilters,
    priceFilters,
    roomFilters,
    statusFilter,
} from '../../../config/filters.config';

import { IFiltersState, SEARCH_FILTERS, USER_POSTS_FILTERS } from './filters.interface';

const filtersInitialState: IFiltersState = {
    [SEARCH_FILTERS.INPUT]: '',
    [SEARCH_FILTERS.GENERAL]: generalFilters(),
    [SEARCH_FILTERS.PRICE]: priceFilters(),
    [SEARCH_FILTERS.HOUSE_TYPE]: houseTypeFilters(),
    [SEARCH_FILTERS.ROOM]: roomFilters(),
    [SEARCH_FILTERS.CITY]: 'kyiv',
    [SEARCH_FILTERS.DISTRICT]: districtFilters(),
    [USER_POSTS_FILTERS.STATUS]: statusFilter(),
};

export default filtersInitialState;
