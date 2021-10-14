import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import authInitialState from './auth.initial-state';
import { IAuthResponse, IAuthState } from './auth.interface';
import { authJoinThunk, authLoginThunk } from './auth.thunk';

const authSlice = createSlice({
    name: 'AUTH',
    initialState: authInitialState,
    reducers: {
        cookiesTokenAction(state: IAuthState, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            state.loginStatus = 'success';
        },
        logoutAction() {
            delete axios.defaults.headers.common.Authorization;
            Cookies.remove('house_rent_auth');
            return authInitialState;
        },
    },
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
        builder.addCase(authLoginThunk.fulfilled, (state: IAuthState, action: PayloadAction<IAuthResponse>) => {
            state.loginStatus = 'success';
            state.accessToken = action.payload.accessToken;
            window.location.reload();
        });
        builder.addCase(authLoginThunk.rejected, (state: IAuthState) => {
            state.loginStatus = 'error';
        });
    },
});

export const { cookiesTokenAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
