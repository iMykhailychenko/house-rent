import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';
import { ErrorState } from '../../interfaces/common';

import { notificationsInitState } from './notifications.initial-state';
import { INotification, INotificationState } from './notifications.interface';
import { getNotificationsCountThunk, notificationsListPaginationThunk, notificationsListThunk } from './notifications.thunk';

const notificationsSlice = createSlice({
    name: 'NOTIFICATIONS',
    initialState: notificationsInitState,
    reducers: {},
    extraReducers: builder => {
        // FETCH NOTIFICATIONS COUNT
        builder.addCase(getNotificationsCountThunk.pending, (state: INotificationState) => {
            state.status = 'loading';
        });
        builder.addCase(getNotificationsCountThunk.fulfilled, (state: INotificationState, action: PayloadAction<number>) => {
            state.status = 'success';
            state.count = action.payload;
        });
        builder.addCase(getNotificationsCountThunk.rejected, (state: INotificationState, action: PayloadAction<unknown>) => {
            state.status = 'error';
            state.error = (action.payload as ErrorState) || null;
        });

        // FETCH NOTIFICATIONS LIST
        builder.addCase(notificationsListThunk.pending, (state: INotificationState) => {
            state.status = 'loading';
        });
        builder.addCase(
            notificationsListThunk.fulfilled,
            (state: INotificationState, action: PayloadAction<Pagination<INotification>>) => {
                state.status = 'success';
                state.data = action.payload;
            },
        );
        builder.addCase(notificationsListThunk.rejected, (state: INotificationState, action) => {
            state.status = 'error';
            state.error = action.payload as ErrorState;
        });

        // FETCH NOTIFICATIONS LIST PAGINATION
        builder.addCase(
            notificationsListPaginationThunk.fulfilled,
            (state: INotificationState, action: PayloadAction<Pagination<INotification>>) => {
                state.data = { ...action.payload, data: [...state.data.data, ...action.payload.data] };
            },
        );
    },
});

export default notificationsSlice.reducer;
