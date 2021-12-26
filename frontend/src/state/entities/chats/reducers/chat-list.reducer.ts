import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { ErrorState } from '../../../interfaces/common';
import { Chat, IChatsState } from '../chats.interface';
import { chatListPaginationThunk, chatListThunk } from '../thunks/chat-list.thunk';

export const chatListReducer = (builder: ActionReducerMapBuilder<IChatsState>): void => {
    builder.addCase(chatListThunk.pending, (state: IChatsState) => {
        state.list.status = 'loading';
    });
    builder.addCase(chatListThunk.fulfilled, (state: IChatsState, action: PayloadAction<Pagination<Chat>>) => {
        state.list = { ...action.payload, status: 'success', error: null };
    });
    builder.addCase(chatListThunk.rejected, (state: IChatsState, action: PayloadAction<unknown>) => {
        state.list.status = 'error';
        state.list.error = action.payload as ErrorState;
    });

    builder.addCase(chatListPaginationThunk.fulfilled, (state: IChatsState, action: PayloadAction<Pagination<Chat>>) => {
        state.list = {
            ...action.payload,
            data: [...state.list.data, ...action.payload.data],
            status: 'success',
            error: null,
        };
    });
};
