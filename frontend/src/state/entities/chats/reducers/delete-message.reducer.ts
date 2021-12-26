import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { IChatsState } from '../chats.interface';
import { deleteMessageThunk } from '../thunks/delete-message.thunk';

export const deleteMessageReducer = (builder: ActionReducerMapBuilder<IChatsState>): void => {
    builder.addCase(deleteMessageThunk.fulfilled, (state: IChatsState, action: PayloadAction<number>) => {
        state.messages.data = state.messages.data.filter(message => message.id !== action.payload);
    });
};
