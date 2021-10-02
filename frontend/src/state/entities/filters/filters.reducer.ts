import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    districtFilters,
    generalFilters,
    houseTypeFilters,
    priceFilters,
    roomFilters,
    statusFilter,
} from '../../../config/filters.config';

import filtersInitialState from './filters.initial-state';
import { City, IFiltersState, SEARCH_FILTERS, USER_POSTS_FILTERS } from './filters.interface';

const filtersSlice = createSlice({
    name: 'FILTERS',
    initialState: filtersInitialState,
    reducers: {
        changeInputFilterAction(state: IFiltersState, action: PayloadAction<string>) {
            state[SEARCH_FILTERS.INPUT] = action.payload;
        },
        changeGeneralFilterAction(state: IFiltersState, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.GENERAL] = generalFilters(action.payload);
        },
        changeRoomFilterAction(state: IFiltersState, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.ROOM] = roomFilters(action.payload);
        },
        changePriceFilterAction(state: IFiltersState, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.PRICE] = priceFilters(action.payload);
        },
        changeHouseTypeFilterAction(state: IFiltersState, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.HOUSE_TYPE] = houseTypeFilters(action.payload);
        },
        changeCityFilterAction(state: IFiltersState, action: PayloadAction<City>) {
            state[SEARCH_FILTERS.CITY] = action.payload;
            state[SEARCH_FILTERS.DISTRICT] = districtFilters(action.payload);
        },
        changeDistrictFilterAction(state: IFiltersState, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.DISTRICT] = districtFilters(state[SEARCH_FILTERS.CITY], action.payload);
        },
        clearAllFilterAction(state: IFiltersState) {
            state[SEARCH_FILTERS.INPUT] = '';
            state[SEARCH_FILTERS.GENERAL] = generalFilters();
            state[SEARCH_FILTERS.ROOM] = roomFilters();
            state[SEARCH_FILTERS.PRICE] = priceFilters();
            state[SEARCH_FILTERS.HOUSE_TYPE] = houseTypeFilters();
            state[SEARCH_FILTERS.CITY] = 'kyiv';
            state[SEARCH_FILTERS.DISTRICT] = districtFilters();
        },
        changePostStatusFilterAction(state: IFiltersState, action: PayloadAction<string[]>) {
            state[USER_POSTS_FILTERS.STATUS] = statusFilter(action.payload);
        },
    },
});

export const {
    changeInputFilterAction,
    changeGeneralFilterAction,
    changeRoomFilterAction,
    changePriceFilterAction,
    changeHouseTypeFilterAction,
    changeCityFilterAction,
    changeDistrictFilterAction,
    clearAllFilterAction,
    changePostStatusFilterAction,
} = filtersSlice.actions;

export default filtersSlice.reducer;
