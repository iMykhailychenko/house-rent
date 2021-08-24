import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { districtFilters, generalFilters, houseTypeFilters, priceFilters, roomFilters } from '../../../config/filters.config';

import filtersInitialState from './filters.initial-state';
import { City, IFiltersState, SEARCH_FILTERS } from './filters.interface';

const filtersSlice = createSlice({
    name: 'FILTERS',
    initialState: filtersInitialState,
    reducers: {
        changeGeneralFiltersAction(state: IFiltersState, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.GENERAL] = generalFilters(action.payload);
        },
        changeRoomFiltersAction(state: IFiltersState, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.ROOM] = roomFilters(action.payload);
        },
        changePriceFiltersAction(state: IFiltersState, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.PRICE] = priceFilters(action.payload);
        },
        changeHouseTypeFiltersAction(state: IFiltersState, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.HOUSE_TYPE] = houseTypeFilters(action.payload);
        },
        changeCityFiltersAction(state: IFiltersState, action: PayloadAction<City>) {
            state[SEARCH_FILTERS.CITY] = action.payload;
            state[SEARCH_FILTERS.DISTRICT] = districtFilters(action.payload);
        },
        changeDistrictFiltersAction(state: IFiltersState, action: PayloadAction<string[]>) {
            state[SEARCH_FILTERS.DISTRICT] = districtFilters(state[SEARCH_FILTERS.CITY], action.payload);
        },
    },
});

export const {
    changeGeneralFiltersAction,
    changeRoomFiltersAction,
    changePriceFiltersAction,
    changeHouseTypeFiltersAction,
    changeCityFiltersAction,
    changeDistrictFiltersAction,
} = filtersSlice.actions;

export default filtersSlice.reducer;
