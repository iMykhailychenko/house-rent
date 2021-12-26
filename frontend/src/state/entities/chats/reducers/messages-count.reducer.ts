import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { IChatsState } from '../chats.interface';
import { messagesCountThunk } from '../thunks/messages-count.thunk';

export const messagesCountReducer = (builder: ActionReducerMapBuilder<IChatsState>): void => {
    builder.addCase(messagesCountThunk.fulfilled, (state: IChatsState, action: PayloadAction<number>) => {
        state.count = action.payload;
    });
};
