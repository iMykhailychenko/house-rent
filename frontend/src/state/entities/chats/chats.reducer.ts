import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';
import { hydrate } from '../../actions';
import { ErrorState } from '../../interfaces/common';
import { IState } from '../../interfaces/root';

import { chatInitialState } from './chats.initial-state';
import { Chat, IChatsState, Message, SingleChat } from './chats.interface';
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
        updateMsgStatusAction(state: IChatsState) {
            state.messages.data = state.messages.data.map(msg => ({ ...msg, isNew: false }));
        },
        pushMessageAction(state: IChatsState, action: PayloadAction<Message>) {
            state.messages.data.unshift(action.payload);
            state.list.data = state.list.data.map(chat =>
                chat.id === state.active ? { ...chat, lastMessage: action.payload } : chat,
            );
        },
        updateMessageAction(state: IChatsState, action: PayloadAction<Message>) {
            state.messages.data = state.messages.data.map(msg => (msg.id === action.payload.id ? action.payload : msg));
        },
    },
    extraReducers: builder => {
        builder.addCase(hydrate, (_, action: PayloadAction<IState>) => action.payload.chats);

        // SINGLE CHAT
        builder.addCase(
            singleChatThunk.pending,
            (state: IChatsState, action: PayloadAction<unknown, string, { arg: number }>) => {
                state.single.status = 'loading';
                state.active = action.meta.arg;
                state.list.data = state.list.data.map(chat =>
                    chat.id === action.meta.arg ? { ...chat, unreadMessages: 0 } : chat,
                );
            },
        );
        builder.addCase(singleChatThunk.fulfilled, (state: IChatsState, action: PayloadAction<SingleChat>) => {
            const [realtorId, customerId] = action.payload.users;
            state.single.status = 'success';
            state.single.data = { realtorId, customerId };
        });
        builder.addCase(singleChatThunk.rejected, (state: IChatsState, action: PayloadAction<unknown>) => {
            state.single.status = 'error';
            state.single.error = action.payload as ErrorState;
        });

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

export const { updateMsgStatusAction, pushMessageAction, updateMessageAction } = chatSlice.actions;

export default chatSlice.reducer;
