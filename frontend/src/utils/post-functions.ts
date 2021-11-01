import { NextRouter } from 'next/router';
import { toast } from 'react-toastify';

import { modal } from '../components/common/modal/modal';
import toastConfig from '../config/toast.cofig';
import { ThunkAppDispatch } from '../hooks/redux.hook';
import { POST_STATUS } from '../state/entities/posts/posts.interface';
import { personalPostsListThunk } from '../state/entities/posts/thunks/personal-posts.thunk';
import { updatePostStatusThunk } from '../state/entities/posts/thunks/update-status.thunk';

import routes from './routes';

export enum POST_ACTIONS {
    ARCHIVE = 'archive',
    EDIT = 'edit',
    ACTIVATE = 'activate',
    DELETE = 'delete',
}

type PostActionsMap = { [key in POST_STATUS]: POST_ACTIONS[] };
export const postActionsMap: PostActionsMap = {
    [POST_STATUS.DRAFT]: [POST_ACTIONS.ACTIVATE, POST_ACTIONS.EDIT, POST_ACTIONS.ARCHIVE, POST_ACTIONS.DELETE],
    [POST_STATUS.ACTIVE]: [POST_ACTIONS.ARCHIVE, POST_ACTIONS.EDIT, POST_ACTIONS.DELETE],
    [POST_STATUS.ARCHIVE]: [POST_ACTIONS.ACTIVATE, POST_ACTIONS.DELETE, POST_ACTIONS.EDIT],
};

type PostFunctionsMap = { [key in POST_ACTIONS]: (postId: number) => Promise<void> };
export const postFunctionsMap = (dispatch: ThunkAppDispatch, history: NextRouter): PostFunctionsMap => {
    const page = +String(history.query.page || 1);
    const status = String(history.query.status || POST_STATUS.DRAFT) as POST_STATUS;

    return {
        [POST_ACTIONS.ARCHIVE]: async (postId: number): Promise<void> => {
            modal.close();
            const post = await dispatch(updatePostStatusThunk({ id: postId, status: POST_STATUS.ARCHIVE })).unwrap();
            if (!post.id) return;
            await dispatch(personalPostsListThunk({ status, page }));
            toast.success('Ви успішно перемістили пост до Архіву. Тепер він прихований від інших користувачів', toastConfig);
        },
        [POST_ACTIONS.EDIT]: async (postId: number): Promise<void> => {
            modal.close();
            history.push(routes.posts.edit(postId));
        },
        [POST_ACTIONS.ACTIVATE]: async (postId: number): Promise<void> => {
            modal.close();
            const post = await dispatch(updatePostStatusThunk({ id: postId, status: POST_STATUS.ACTIVE })).unwrap();
            if (!post.id) return;
            await dispatch(personalPostsListThunk({ status, page }));
            toast.success('Ви успішно активували свій пост! Тепер він доступний для інших користувачів на сайті', toastConfig);
        },
        [POST_ACTIONS.DELETE]: async (postId: number): Promise<void> => {
            modal.close();
            const post = await dispatch(updatePostStatusThunk({ id: postId, status: POST_STATUS.ACTIVE })).unwrap();
            if (!post.id) return;
            await dispatch(personalPostsListThunk({ status, page }));
            toast.success('Ви успішно активували свій пост! Тепер він доступний для інших користувачів на сайті', toastConfig);
        },
    };
};
