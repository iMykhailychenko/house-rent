import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { bannersInitialState } from './banners.initial-state';
import { Banner } from './banners.interface';

const bannersSlice = createSlice({
    name: 'BANNERS',
    initialState: bannersInitialState,
    reducers: {
        addBanner(state: Banner[], action: PayloadAction<Banner>) {
            if (!state.some(({ id }) => id === action.payload.id)) {
                state.push(action.payload);
            }
        },
        deleteBanner(state: Banner[], action: PayloadAction<string>) {
            return state.filter(({ id }) => id === action.payload);
        },
        deleteAllBanners() {
            return [];
        },
    },
});

export const { addBanner, deleteBanner, deleteAllBanners } = bannersSlice.actions;

export default bannersSlice.reducer;
