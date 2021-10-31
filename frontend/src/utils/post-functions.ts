import { POST_STATUS } from '../state/entities/posts/posts.interface';

export enum POST_ACTIONS {
    ARCHIVE = 'archive',
    EDIT = 'edit',
    ACTIVATE = 'activate',
    DELETE = 'delete',
    DRAFT = 'draft',
    ACTIVE = 'activate',
}

type PostActionsMap = { [key in POST_STATUS]: string[] };
export const postActionsMap: PostActionsMap = {
    [POST_STATUS.DRAFT]: [POST_ACTIONS.ARCHIVE, POST_ACTIONS.EDIT, POST_ACTIONS.ACTIVATE, POST_ACTIONS.DELETE],
    [POST_STATUS.ACTIVE]: [POST_ACTIONS.ARCHIVE, POST_ACTIONS.EDIT, POST_ACTIONS.DRAFT, POST_ACTIONS.DELETE],
    [POST_STATUS.ARCHIVE]: [POST_ACTIONS.DELETE, POST_ACTIONS.EDIT, POST_ACTIONS.DRAFT, POST_ACTIONS.ACTIVE],
};

type PostFunctionsMap = { [key in POST_ACTIONS]: (postId: number) => Promise<void> };
export const postFunctionsMap: PostFunctionsMap = {
    [POST_ACTIONS.ARCHIVE]: async (postId: number): Promise<void> => {
        console.log(postId);
    },
    [POST_ACTIONS.EDIT]: async (postId: number): Promise<void> => {
        console.log(postId);
    },
    [POST_ACTIONS.ACTIVATE]: async (postId: number): Promise<void> => {
        console.log(postId);
    },
    [POST_ACTIONS.DELETE]: async (postId: number): Promise<void> => {
        console.log(postId);
    },
    [POST_ACTIONS.DRAFT]: async (postId: number): Promise<void> => {
        console.log(postId);
    },
    [POST_ACTIONS.ACTIVE]: async (postId: number): Promise<void> => {
        console.log(postId);
    },
};
