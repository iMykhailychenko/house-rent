import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';
import { ErrorState } from '../../interfaces/common';

import { notificationsInitState } from './notifications.initial-state';
import { INotification, INotificationState } from './notifications.interface';
import {
    deleteAllNotificationsThunk,
    deleteNotificationByIdThunk,
    getNotificationsCountThunk,
    notificationsListPaginationThunk,
    notificationsListThunk,
} from './notifications.thunk';

const notificationsSlice = createSlice({
    name: 'NOTIFICATIONS',
    initialState: notificationsInitState,
    reducers: {
        pushNotificationsAction(state: INotificationState, action: PayloadAction<INotification>) {
            state.count += 1;
            state.data.data = [action.payload, ...state.data.data];
        },
        resetNotificationsCountAction(state: INotificationState) {
            state.count = 0;
        },
    },
    extraReducers: builder => {
        // FETCH NOTIFICATIONS COUNT
        builder.addCase(getNotificationsCountThunk.fulfilled, (state: INotificationState, action: PayloadAction<number>) => {
            state.count = action.payload;
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

        // DELETE
        builder.addCase(
            deleteNotificationByIdThunk.fulfilled,
            (state: INotificationState, action: PayloadAction<unknown, string, { arg: number }>) => {
                state.count = state.count < 1 ? 0 : state.count - 1;
                state.data.data = state.data.data.filter(item => item.id !== action.meta.arg);
            },
        );
        builder.addCase(deleteAllNotificationsThunk.fulfilled, (state: INotificationState) => {
            state.count = 0;
            state.data = notificationsInitState.data;
        });
    },
});

export const { pushNotificationsAction, resetNotificationsCountAction } = notificationsSlice.actions;

export default notificationsSlice.reducer;
