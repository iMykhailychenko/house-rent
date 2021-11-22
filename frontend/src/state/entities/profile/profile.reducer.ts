import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, UserRole } from '../../../interfaces';
import { restorePasswordThunk } from '../auth/auth.thunk';

import { profileInitialState } from './profile.initial-state';
import { IProfileInfoState } from './profile.interface';
import { changeEmailThunk, profileInfoThunk, updateProfileRoleThunk, updateProfileThunk } from './profile.thunk';

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

        builder.addCase(updateProfileRoleThunk.fulfilled, (state: IProfileInfoState, action: PayloadAction<UserRole[]>) => {
            state.data.role = action.payload;
        });

        builder.addCase(updateProfileThunk.fulfilled, (state: IProfileInfoState, action: PayloadAction<IUser>) => {
            state.data = action.payload;
        });

        builder.addCase(changeEmailThunk.fulfilled, (state: IProfileInfoState, action: PayloadAction<IUser>) => {
            state.data = action.payload;
        });

        builder.addCase(restorePasswordThunk.fulfilled, () => {
            return profileInitialState;
        });
    },
});

export default profileSlice.reducer;
