import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { ErrorState } from '../../../interfaces/common';
import { IChatsState, Message } from '../chats.interface';
import { messagesListPaginationThunk, messagesListThunk } from '../thunks/messages-list.thunk';

export const messagesListReducer = (builder: ActionReducerMapBuilder<IChatsState>): void => {
    builder.addCase(messagesListThunk.pending, (state: IChatsState) => {
        state.messages.status = 'loading';
    });
    builder.addCase(messagesListThunk.fulfilled, (state: IChatsState, action: PayloadAction<Pagination<Message>>) => {
        state.messages = { ...action.payload, status: 'success', error: null };
    });
    builder.addCase(messagesListThunk.rejected, (state: IChatsState, action: PayloadAction<unknown>) => {
        state.messages.status = 'error';
        state.list.error = action.payload as ErrorState;
    });

    builder.addCase(messagesListPaginationThunk.fulfilled, (state: IChatsState, action: PayloadAction<Pagination<Message>>) => {
        state.messages = {
            ...action.payload,
            data: [...state.messages.data, ...action.payload.data],
            status: 'success',
            error: null,
        };
    });
};
