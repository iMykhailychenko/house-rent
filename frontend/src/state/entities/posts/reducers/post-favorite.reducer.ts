import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { IPost, IPostState } from '../posts.interface';
import { personalPostsListPaginationThunk } from '../thunks/personal-posts.thunk';
import { getFavoritePostsPaginationThunk, getFavoritePostsThunk, togglePostFavoriteThunk } from '../thunks/post-favorite.thunk';

export const postFavoriteReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    builder.addCase(
        togglePostFavoriteThunk.fulfilled,
        (state: IPostState, action: PayloadAction<void, string, { arg: number }>) => {
            state.single.data = {
                ...state.single.data,
                isFavorite: !state.single.data.isFavorite,
                favorite: state.single.data.isFavorite ? state.single.data.favorite - 1 : state.single.data.favorite + 1,
            };
            state.list.data = state.list.data.map<IPost>(post =>
                post.id === action.meta.arg
                    ? {
                          ...post,
                          isFavorite: !post.isFavorite,
                          favorite: post.isFavorite ? post.favorite - 1 : post.favorite + 1,
                      }
                    : post,
            );
        },
    );

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
