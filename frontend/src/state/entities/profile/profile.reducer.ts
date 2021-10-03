import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../../interfaces';

import { profileInitialState } from './profile.initial-state';
import { IProfileInfoState } from './profile.interface';
import { profileInfoThunk } from './profile.thunk';

const profileSlice = createSlice({
    name: 'PROFILE',
    initialState: profileInitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase('AUTH/logoutAction', () => profileInitialState);

        // thunk
        builder.addCase(profileInfoThunk.pending, (state: IProfileInfoState) => {
            state.status = 'loading';
        });
        builder.addCase(profileInfoThunk.fulfilled, (state: IProfileInfoState, action: PayloadAction<IUser>) => {
            state.status = 'success';
            state.data = action.payload;
        });
        builder.addCase(profileInfoThunk.rejected, (state: IProfileInfoState) => {
            state.status = 'error';
        });
    },
});

export default profileSlice.reducer;
