import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { IChatsState, Message } from '../chats.interface';
import { updateMessageThunk } from '../thunks/update-message.thunk';

export const updateMessageReducer = (builder: ActionReducerMapBuilder<IChatsState>): void => {
    builder.addCase(updateMessageThunk.fulfilled, (state: IChatsState, action: PayloadAction<Message>) => {
        state.messages.data = state.messages.data.map(message => (message.id === action.payload.id ? action.payload : message));
    });
};
