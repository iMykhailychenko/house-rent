import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../../interfaces';
import { profileInitialState } from '../profile/profile.initial-state';

import { IUserState } from './users.interface';
import { userInfoThunk } from './users.thunk';

const userSlice = createSlice({
    name: 'USER',
    initialState: profileInitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(userInfoThunk.pending, (state: IUserState) => {
            state.status = 'loading';
        });
        builder.addCase(userInfoThunk.fulfilled, (state: IUserState, action: PayloadAction<IUser>) => {
            state.status = 'success';
            state.data = action.payload;
        });
        builder.addCase(userInfoThunk.rejected, (state: IUserState) => {
            state.status = 'error';
        });
    },
});

export default userSlice.reducer;
