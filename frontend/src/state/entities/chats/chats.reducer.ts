import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';
import { hydrate } from '../../actions';
import { ErrorState } from '../../interfaces/common';
import { IState } from '../../interfaces/root';

import { chatInitialState } from './chats.initial-state';
import { Chat, IChatsState, Message } from './chats.interface';
import {
    chatListPaginationThunk,
    chatListThunk,
    messagesCountThunk,
    messagesListPaginationThunk,
    messagesListThunk,
    singleChatThunk,
} from './chats.thunk';

const chatSlice = createSlice({
    name: 'CHATS',
    initialState: chatInitialState,
    reducers: {
        pushMessageAction(state: IChatsState, action: PayloadAction<Message>) {
            state.messages.data.unshift(action.payload);
            state.list.data = state.list.data.map(chat =>
                chat.id === state.single.data?.id ? { ...chat, lastMessage: action.payload } : chat,
            );
        },
        updateMessageAction(state: IChatsState, action: PayloadAction<Message>) {
            state.messages.data = state.messages.data.map(msg => (msg.id === action.payload.id ? action.payload : msg));
        },
    },
    extraReducers: builder => {
        builder.addCase(hydrate, (_, action: PayloadAction<IState>) => action.payload.chats);

        // CHATS COUNT
        builder.addCase(messagesCountThunk.fulfilled, (state: IChatsState, action: PayloadAction<number>) => {
            state.count = action.payload;
        });

        // CHATS PAGINATION THUNK
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

        // SINGLE CHAT
        builder.addCase(singleChatThunk.pending, (state: IChatsState) => {
            state.single.status = 'loading';
        });
        builder.addCase(singleChatThunk.fulfilled, (state: IChatsState, action: PayloadAction<Chat>) => {
            state.single.status = 'success';
            state.single.data = action.payload;
        });
        builder.addCase(singleChatThunk.rejected, (state: IChatsState, action: PayloadAction<unknown>) => {
            state.single.status = 'error';
            state.list.error = action.payload as ErrorState;
        });

        // MESSAGES PAGINATION THUNK
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

        builder.addCase(
            messagesListPaginationThunk.fulfilled,
            (state: IChatsState, action: PayloadAction<Pagination<Message>>) => {
                state.messages = {
                    ...action.payload,
                    data: [...state.messages.data, ...action.payload.data],
                    status: 'success',
                    error: null,
                };
            },
        );
    },
});

export const { pushMessageAction, updateMessageAction } = chatSlice.actions;

export default chatSlice.reducer;
