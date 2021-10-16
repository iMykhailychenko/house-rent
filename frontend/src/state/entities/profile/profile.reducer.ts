import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, UserRole } from '../../../interfaces';
import { IUserState } from '../users/users.interface';

import { profileInitialState } from './profile.initial-state';
import { IProfileInfoState } from './profile.interface';
import { profileInfoThunk, updateProfileRole } from './profile.thunk';

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

        builder.addCase(updateProfileRole.fulfilled, (state: IUserState, action: PayloadAction<UserRole[]>) => {
            state.data.role = action.payload;
        });
    },
});

export default profileSlice.reducer;
