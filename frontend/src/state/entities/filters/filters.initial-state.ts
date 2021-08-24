import { generalFilters, houseTypeFilters, priceFilters, roomFilters } from '../../../config/filters.config';

import { IFiltersState, SEARCH_FILTERS } from './filters.interface';

const filtersInitialState: IFiltersState = {
    [SEARCH_FILTERS.GENERAL]: generalFilters(),
    [SEARCH_FILTERS.PRICE]: priceFilters(),
    [SEARCH_FILTERS.HOUSE_TYPE]: houseTypeFilters(),
    [SEARCH_FILTERS.ROOM]: roomFilters(),
    [SEARCH_FILTERS.CITY]: 'kyiv',
    [SEARCH_FILTERS.DISTRICT]: 'kyiv',
};

export default filtersInitialState;
