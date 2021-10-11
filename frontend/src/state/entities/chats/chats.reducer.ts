import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';

import { chatInitialState } from './chats.initial-state';
import { Chat, IChatsState } from './chats.interface';
import { chatListThunk } from './chats.thunk';

const chatSlice = createSlice({
    name: 'CHATS',
    initialState: chatInitialState,
    reducers: {},
    extraReducers: builder => {
        // USER POSTS PAGINATION THUNK
        builder.addCase(chatListThunk.pending, (state: IChatsState) => {
            state.list.status = 'loading';
        });
        builder.addCase(chatListThunk.fulfilled, (state: IChatsState, action: PayloadAction<Pagination<Chat>>) => {
            state.list.status = 'success';
            state.list.totalItems = action.payload.totalItems;
            state.list.totalPages = action.payload.totalPages;
            state.list.currentPage = action.payload.currentPage;
            state.list.data = [...state.list.data, ...action.payload.data];
        });
        builder.addCase(chatListThunk.rejected, (state: IChatsState) => {
            state.list.status = 'error';
            state.list.error = 'error';
        });
    },
});

export default chatSlice.reducer;
