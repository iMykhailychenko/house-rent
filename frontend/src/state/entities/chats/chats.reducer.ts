import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { hydrate } from '../../actions';
import { IState } from '../../interfaces/root';

import { chatInitialState } from './chats.initial-state';
import { IChatsState, Message } from './chats.interface';
import { chatListReducer } from './reducers/chat-list.reducer';
import { deleteMessageReducer } from './reducers/delete-message.reducer';
import { messagesCountReducer } from './reducers/messages-count.reducer';
import { messagesListReducer } from './reducers/messages-list.reducer';
import { singleChatReducer } from './reducers/single-chat.reducer';
import { updateMessageReducer } from './reducers/update-message.reducer';

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
    },
    extraReducers: builder => {
        builder.addCase(hydrate, (_, action: PayloadAction<IState>) => action.payload.chats);
        singleChatReducer(builder);
        messagesCountReducer(builder);
        chatListReducer(builder);
        messagesListReducer(builder);
        updateMessageReducer(builder);
        deleteMessageReducer(builder);
    },
});

export const { updateMsgStatusAction, pushMessageAction } = chatSlice.actions;

export default chatSlice.reducer;
