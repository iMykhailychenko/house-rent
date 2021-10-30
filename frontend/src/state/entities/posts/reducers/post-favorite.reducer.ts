import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { IPost, IPostState } from '../posts.interface';
import { togglePostFavoriteThunk } from '../thunks/post-favorite.thunk';

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
};
