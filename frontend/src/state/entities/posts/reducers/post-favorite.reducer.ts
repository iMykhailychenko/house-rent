import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
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
    builder.addCase(getIsPostFavoriteThunk.rejected, (state: IPostState) => {
        state.config.status = 'error';
        state.config.error = 'error';
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
    builder.addCase(togglePostFavoriteThunk.rejected, (state: IPostState) => {
        state.config.status = 'error';
        state.config.error = 'error';
    });

    // TOGGLE FAVORITE
    builder.addCase(getFavoritePostsThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(getFavoritePostsThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list.status = 'success';
        state.list.totalItems = action.payload.totalItems;
        state.list.totalPages = action.payload.totalPages;
        state.list.currentPage = action.payload.currentPage;
        state.list.data = action.payload.data;
    });
    builder.addCase(getFavoritePostsThunk.rejected, (state: IPostState) => {
        state.list.status = 'error';
        state.list.error = 'error';
    });

    // FAVORITE LIST
    builder.addCase(getFavoritePostsPaginationThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(getFavoritePostsPaginationThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list.status = 'success';
        state.list.totalItems = action.payload.totalItems;
        state.list.totalPages = action.payload.totalPages;
        state.list.currentPage = action.payload.currentPage;
        state.list.data = [...state.list.data, ...action.payload.data];
    });
    builder.addCase(getFavoritePostsPaginationThunk.rejected, (state: IPostState) => {
        state.list.status = 'error';
        state.list.error = 'error';
    });
};
