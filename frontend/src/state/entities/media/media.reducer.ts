import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { mediaInitialState } from './media.initial-state';
import { IMediaState } from './media.interface';

const mediaSlice = createSlice({
    name: 'MEDIA',
    initialState: mediaInitialState,
    reducers: {
        updateProgress(state: IMediaState, action: PayloadAction<number>) {
            state.progress = action.payload;
        },
    },
});

export const {} = mediaSlice.actions;

export default mediaSlice.reducer;
