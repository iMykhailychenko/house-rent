import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import authInitialState from './auth.initial-state';
import { IAuthInitialState, IAuthResponse } from './auth.interface';
import { authLoginThunk } from './auth.thunk';

const authSlice = createSlice({
    name: 'AUTH',
    initialState: authInitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authLoginThunk.pending, (state: IAuthInitialState) => {
            state.status = 'loading';
        });
        builder.addCase(authLoginThunk.fulfilled, (state: IAuthInitialState, action: PayloadAction<IAuthResponse>) => {
            state.status = 'success';
            state.accessToken = action.payload.accessToken;
        });
        builder.addCase(authLoginThunk.rejected, (state: IAuthInitialState) => {
            state.status = 'error';
        });
    },
});

export default authSlice.reducer;
