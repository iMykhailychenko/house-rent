import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';
import { hydrate } from '../../actions';
import { IState } from '../../interfaces';

import { chatInitialState } from './chats.initial-state';
import { Chat, IChatsState, Message } from './chats.interface';
import { chatListThunk, messagesListThunk, singleChatThunk } from './chats.thunk';

const chatSlice = createSlice({
    name: 'CHATS',
    initialState: chatInitialState,
    reducers: {
        pushMessage(state: IChatsState, action: PayloadAction<Message>) {
            state.messages.data.unshift(action.payload);
            state.list.data = state.list.data.map(chat =>
                chat.id === state.single.data?.id ? { ...chat, lastMessage: action.payload } : chat,
            );
        },
        updateMessage(state: IChatsState, action: PayloadAction<Message>) {
            state.messages.data = state.messages.data.map(msg => (msg.id === action.payload.id ? action.payload : msg));
        },
    },
    extraReducers: builder => {
        builder.addCase(hydrate, (_, action: PayloadAction<IState>) => action.payload.chats);

        // CHATS PAGINATION THUNK
        builder.addCase(chatListThunk.pending, (state: IChatsState) => {
            state.list.status = 'loading';
        });
        builder.addCase(chatListThunk.fulfilled, (state: IChatsState, action: PayloadAction<Pagination<Chat>>) => {
            state.list.status = 'success';
            state.list.totalItems = action.payload.totalItems;
            state.list.totalPages = action.payload.totalPages;
            state.list.currentPage = action.payload.currentPage;
            state.list.data = action.payload.data;
        });
        builder.addCase(chatListThunk.rejected, (state: IChatsState) => {
            state.list.status = 'error';
            state.list.error = 'error';
        });

        // SINGLE CHAT
        builder.addCase(singleChatThunk.pending, (state: IChatsState) => {
            state.single.status = 'loading';
        });
        builder.addCase(singleChatThunk.fulfilled, (state: IChatsState, action: PayloadAction<Chat>) => {
            state.single.status = 'success';
            state.single.data = action.payload;
        });
        builder.addCase(singleChatThunk.rejected, (state: IChatsState) => {
            state.single.status = 'error';
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
            state.messages.data = action.payload.data;
        });
        builder.addCase(messagesListThunk.rejected, (state: IChatsState) => {
            state.messages.status = 'error';
            state.messages.error = 'error';
        });
    },
});

export const { pushMessage, updateMessage } = chatSlice.actions;

export default chatSlice.reducer;
