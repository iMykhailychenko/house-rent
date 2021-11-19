import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import toastConfig from '../../../../config/toast.cofig';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { IEditPostStatusPayload, IPost } from '../posts.interface';
import postsServices from '../posts.services';

export const updatePostStatusThunk = createAsyncThunk<IPost, IEditPostStatusPayload>(
    'POSTS/STATUS',
    async (payload: IEditPostStatusPayload) => {
        try {
            const { data, status } = await postsServices.updatePostStatus(payload);
            if (status < 200 || status >= 300) throw new Error();
            toast.success('Ви успішно активували свій пост! Тепер він доступний для інших користувачів на сайті', toastConfig);
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);
