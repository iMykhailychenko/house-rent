import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import authInitialState from './auth.initial-state';
import { IAuthInitialState, IAuthResponse } from './auth.interface';
import { authJoinThunk, authLoginThunk } from './auth.thunk';

const authSlice = createSlice({
    name: 'AUTH',
    initialState: authInitialState,
    reducers: {
        cookiesTokenAction(state: IAuthInitialState, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            state.loginStatus = 'success';
        },
        logoutAction(state: IAuthInitialState) {
            state.accessToken = null;
            state.loginStatus = 'idle';
        },
    },
    extraReducers: builder => {
        builder.addCase(authJoinThunk.pending, (state: IAuthInitialState) => {
            state.joinStatus = 'loading';
        });
        builder.addCase(authJoinThunk.fulfilled, (state: IAuthInitialState) => {
            state.joinStatus = 'success';
        });
        builder.addCase(authJoinThunk.rejected, (state: IAuthInitialState) => {
            state.joinStatus = 'error';
        });

        builder.addCase(authLoginThunk.pending, (state: IAuthInitialState) => {
            state.loginStatus = 'loading';
        });
        builder.addCase(authLoginThunk.fulfilled, (state: IAuthInitialState, action: PayloadAction<IAuthResponse>) => {
            state.loginStatus = 'success';
            state.accessToken = action.payload.accessToken;
        });
        builder.addCase(authLoginThunk.rejected, (state: IAuthInitialState) => {
            state.loginStatus = 'error';
        });
    },
});

export const { cookiesTokenAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
