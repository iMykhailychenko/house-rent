import { NextRouter } from 'next/router';

import { modal } from '../components/common/modal/modal';
import activatePost from '../components/common/modal/modals/activate-post/activate-post';
import archivePost from '../components/common/modal/modals/archive-post/archive-post';
import deletePost from '../components/common/modal/modals/delete-post/delete-post';
import { POST_STATUS } from '../state/entities/posts/posts.interface';

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
export const postFunctionsMap = (history: NextRouter, isSinglePost = false): PostFunctionsMap => ({
    [POST_ACTIONS.ARCHIVE]: async (postId: number): Promise<void> => {
        archivePost(postId, isSinglePost);
    },
    [POST_ACTIONS.EDIT]: async (postId: number): Promise<void> => {
        modal.close();
        history.push(routes.posts.edit(postId));
    },
    [POST_ACTIONS.ACTIVATE]: async (postId: number): Promise<void> => {
        activatePost(postId, isSinglePost);
    },
    [POST_ACTIONS.DELETE]: async (postId: number): Promise<void> => {
        deletePost(postId, isSinglePost);
    },
});
