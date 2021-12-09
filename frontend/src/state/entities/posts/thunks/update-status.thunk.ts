import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { formatSeverError } from '../../../utils';
import { IEditPostStatusPayload, IPost } from '../posts.interface';
import postsServices from '../posts.services';

export const updatePostStatusThunk = createAsyncThunk<IPost, IEditPostStatusPayload>(
    'POSTS/STATUS',
    async (payload: IEditPostStatusPayload, { rejectWithValue }) => {
        try {
            const { data, status } = await postsServices.updatePostStatus(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);
