import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ErrorState } from '../../interfaces/common';

import { ratingInitialState } from './rating.initial-state';
import { IRatingState, UserRating } from './rating.interface';
import { getRatingThunk } from './rating.thunk';

const ratingSlice = createSlice({
    name: 'NOTIFICATIONS',
    initialState: ratingInitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getRatingThunk.pending, (state: IRatingState) => {
            state.status = 'loading';
        });
        builder.addCase(getRatingThunk.fulfilled, (state: IRatingState, action: PayloadAction<UserRating>) => {
            state.status = 'success';
            state.data = action.payload;
        });
        builder.addCase(getRatingThunk.rejected, (state: IRatingState, action: PayloadAction<unknown>) => {
            state.status = 'error';
            state.error = action.payload as ErrorState;
        });
    },
});

export default ratingSlice.reducer;
