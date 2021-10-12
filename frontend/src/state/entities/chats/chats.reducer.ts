import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';

import { chatInitialState } from './chats.initial-state';
import { Chat, IChatsState, Message } from './chats.interface';
import { chatListThunk, messagesListThunk } from './chats.thunk';

const chatSlice = createSlice({
    name: 'CHATS',
    initialState: chatInitialState,
    reducers: {},
    extraReducers: builder => {
        // CHATS PAGINATION THUNK
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

        // MESSAGES PAGINATION THUNK
        builder.addCase(messagesListThunk.pending, (state: IChatsState) => {
            state.messages.status = 'loading';
        });
        builder.addCase(messagesListThunk.fulfilled, (state: IChatsState, action: PayloadAction<Pagination<Message>>) => {
            state.messages.status = 'success';
            state.messages.totalItems = action.payload.totalItems;
            state.messages.totalPages = action.payload.totalPages;
            state.messages.currentPage = action.payload.currentPage;
            state.messages.data = [...state.messages.data, ...action.payload.data];
        });
        builder.addCase(messagesListThunk.rejected, (state: IChatsState) => {
            state.messages.status = 'error';
            state.messages.error = 'error';
        });
    },
});

export default chatSlice.reducer;
