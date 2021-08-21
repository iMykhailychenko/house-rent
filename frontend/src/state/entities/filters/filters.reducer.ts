import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { cityFilters, generalFilters, houseTypeFilters, priceFilters, roomFilters } from '../../../config/filters.config';
import { ISearchFilters, SEARCH_FILTERS } from '../../../interfaces';

import filtersInitialState from './filters.initial-state';

const filtersSlice = createSlice({
    name: 'FILTERS',
    initialState: filtersInitialState,
    reducers: {
        changeGeneralFiltersAction(state: ISearchFilters, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.GENERAL] = generalFilters(action.payload);
        },
        changeRoomFiltersAction(state: ISearchFilters, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.ROOM] = roomFilters(action.payload);
        },
        changePriceFiltersAction(state: ISearchFilters, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.PRICE] = priceFilters(action.payload);
        },
        changeCityFiltersAction(state: ISearchFilters, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.CITY] = cityFilters(action.payload);
        },
        changeHouseTypeFiltersAction(state: ISearchFilters, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.HOUSE_TYPE] = houseTypeFilters(action.payload);
        },
    },
});

export const {
    changeGeneralFiltersAction,
    changeRoomFiltersAction,
    changePriceFiltersAction,
    changeCityFiltersAction,
    changeHouseTypeFiltersAction,
} = filtersSlice.actions;

export default filtersSlice.reducer;
