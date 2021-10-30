import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../../utils/helpers';
import postsServices from '../posts.services';

export const togglePostFavoriteThunk = createAsyncThunk<void, number>('POSTS/TOGGLE_FAVORITE', async payload => {
    try {
        const { status } = await postsServices.toggleFavorite(payload);
        if (status < 200 || status >= 300) throw new Error();
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});
