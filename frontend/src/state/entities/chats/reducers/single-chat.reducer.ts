import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { ErrorState } from '../../../interfaces/common';
import { IChatsState, SingleChat } from '../chats.interface';
import { singleChatThunk } from '../thunks/single-chat.thunk';

export const singleChatReducer = (builder: ActionReducerMapBuilder<IChatsState>): void => {
    builder.addCase(singleChatThunk.pending, (state: IChatsState, action: PayloadAction<unknown, string, { arg: number }>) => {
        state.single.status = 'loading';
        state.active = action.meta.arg;
        state.list.data = state.list.data.map(chat => (chat.id === action.meta.arg ? { ...chat, unreadMessages: 0 } : chat));
    });
    builder.addCase(singleChatThunk.fulfilled, (state: IChatsState, action: PayloadAction<SingleChat>) => {
        const [realtorId, customerId] = action.payload.users;
        state.single.status = 'success';
        state.single.data = { realtorId, customerId };
    });
    builder.addCase(singleChatThunk.rejected, (state: IChatsState, action: PayloadAction<unknown>) => {
        state.single.status = 'error';
        state.single.error = action.payload as ErrorState;
    });
};
