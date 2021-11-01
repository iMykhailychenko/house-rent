import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../../utils/helpers';
import { IEditPostStatusPayload, IPost } from '../posts.interface';
import postsServices from '../posts.services';

export const updatePostStatusThunk = createAsyncThunk<IPost, IEditPostStatusPayload>(
    'POSTS/STATUS',
    async (payload: IEditPostStatusPayload) => {
        try {
            const { data, status } = await postsServices.updatePostStatus(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);
