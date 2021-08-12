import { cityFilters, generalFilters, houseTypeFilters, priceFilters, roomFilters } from '../../../config/filters.config';
import { ISearchFilters, SEARCH_FILTERS } from '../../../interfaces';

const filtersInitialState: ISearchFilters = {
    [SEARCH_FILTERS.GENERAL]: generalFilters(),
    [SEARCH_FILTERS.PRICE]: priceFilters(),
    [SEARCH_FILTERS.HOUSE_TYPE]: houseTypeFilters(),
    [SEARCH_FILTERS.ROOM]: roomFilters(),
    [SEARCH_FILTERS.CITY]: cityFilters(),
};

export default filtersInitialState;
