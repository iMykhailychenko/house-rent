import { createSlice } from '@reduxjs/toolkit';

import authInitialState from './auth.initial-state';
import { IAuthState } from './auth.interface';
import { authJoinThunk, authLoginThunk, restorePasswordThunk } from './auth.thunk';

const authSlice = createSlice({
    name: 'AUTH',
    initialState: authInitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authJoinThunk.pending, (state: IAuthState) => {
            state.joinStatus = 'loading';
        });
        builder.addCase(authJoinThunk.fulfilled, (state: IAuthState) => {
            state.joinStatus = 'success';
        });
        builder.addCase(authJoinThunk.rejected, (state: IAuthState) => {
            state.joinStatus = 'error';
        });

        builder.addCase(authLoginThunk.pending, (state: IAuthState) => {
            state.loginStatus = 'loading';
        });
        builder.addCase(authLoginThunk.fulfilled, (state: IAuthState) => {
            state.loginStatus = 'success';
        });
        builder.addCase(authLoginThunk.rejected, (state: IAuthState) => {
            state.loginStatus = 'error';
        });

        builder.addCase(restorePasswordThunk.fulfilled, () => {
            return authInitialState;
        });
    },
});

export default authSlice.reducer;
