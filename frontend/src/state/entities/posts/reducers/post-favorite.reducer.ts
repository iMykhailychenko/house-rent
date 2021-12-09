import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { ErrorState } from '../../../interfaces/common';
import { IPost, IPostState } from '../posts.interface';
import {
    getFavoritePostsPaginationThunk,
    getFavoritePostsThunk,
    getIsPostFavoriteThunk,
    togglePostFavoriteThunk,
} from '../thunks/post-favorite.thunk';

export const postFavoriteReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    // IS POST IN FAVORITE
    builder.addCase(getIsPostFavoriteThunk.pending, (state: IPostState) => {
        state.config.status = 'loading';
    });
    builder.addCase(
        getIsPostFavoriteThunk.fulfilled,
        (state: IPostState, action: PayloadAction<boolean, string, { arg: IPost }>) => {
            state.config.status = 'success';
            state.config.data[action.meta.arg.id] = { ...action.meta.arg, isFavorite: action.payload };
        },
    );
    builder.addCase(getIsPostFavoriteThunk.rejected, (state: IPostState, action) => {
        state.config.status = 'error';
        state.new.error = action.payload as ErrorState;
    });

    builder.addCase(togglePostFavoriteThunk.pending, (state: IPostState) => {
        state.config.status = 'success';
    });
    builder.addCase(
        togglePostFavoriteThunk.fulfilled,
        (state: IPostState, action: PayloadAction<void, string, { arg: number }>) => {
            state.config.status = 'success';
            state.config.data[action.meta.arg].isFavorite = !state.config.data[action.meta.arg].isFavorite;
        },
    );
    builder.addCase(togglePostFavoriteThunk.rejected, (state: IPostState, action: PayloadAction<unknown>) => {
        state.config.status = 'error';
        state.new.error = action.payload as ErrorState;
    });

    // TOGGLE FAVORITE
    builder.addCase(getFavoritePostsThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(getFavoritePostsThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list = { ...action.payload, status: 'success', error: null };
    });
    builder.addCase(getFavoritePostsThunk.rejected, (state: IPostState, action: PayloadAction<unknown>) => {
        state.list.status = 'error';
        state.new.error = action.payload as ErrorState;
    });

    // FAVORITE LIST
    builder.addCase(getFavoritePostsPaginationThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(getFavoritePostsPaginationThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list = { ...action.payload, data: [...state.list.data, ...action.payload.data], status: 'success', error: null };
    });
    builder.addCase(getFavoritePostsPaginationThunk.rejected, (state: IPostState, action: PayloadAction<unknown>) => {
        state.list.status = 'error';
        state.new.error = action.payload as ErrorState;
    });
};
