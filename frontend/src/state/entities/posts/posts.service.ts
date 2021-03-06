import queryString from 'query-string';

import endpointConfig from '../../../config/endpoint.config';
import uiConfig from '../../../config/ui.config';
import { MAX_POSTS_FOR_USER } from '../../../constant/post.constant';
import { Pagination, Params, Response } from '../../../interfaces';
import api from '../../../utils/interceptors';

import { IEditPostPayload, IEditPostStatusPayload, INewPostPayload, IPersonalPostsListPayload, IPost } from './posts.interface';

const postsService = {
    singlePost: (id: number): Response<IPost> => api.get(endpointConfig('/posts/' + id)),
    postsList: (page: number, query: Params = {}): Response<Pagination<IPost>> =>
        api.get(
            endpointConfig(
                '/posts/?' +
                    queryString.stringify(
                        { page, limit: uiConfig.postsPerPage, ...query },
                        { skipNull: true, arrayFormat: 'comma' },
                    ),
            ),
        ),
    personalPosts: (query: IPersonalPostsListPayload): Response<Pagination<IPost>> =>
        api.get(endpointConfig('/posts/personal'), { params: { ...query, limit: uiConfig.postsPerPage } }),
    getUserPostsList: (userId: number): Response<Pagination<IPost>> =>
        api.get(endpointConfig(`/posts/users/${userId}`), { params: { limit: MAX_POSTS_FOR_USER } }),
    newPost: (body: INewPostPayload): Response<IPost> => api.post(endpointConfig('/posts'), body),
    updatePost: ({ id, body }: IEditPostPayload): Response<IPost> => api.put(endpointConfig(`/posts/${id}`), body),
    updatePostStatus: ({ id, status }: IEditPostStatusPayload): Response<IPost> =>
        api.put(endpointConfig(`/posts/${id}/status`), { status }),
    deletePost: (id: number): Response<void> => api.delete(endpointConfig(`/posts/${id}`)),
    toggleFavorite: (id: number): Response<void> => api.put(endpointConfig(`/favorite/${id}`)),
    getFavorite: (page: number): Response<Pagination<IPost>> =>
        api.get(endpointConfig('/posts/favorite'), { params: { page, limit: uiConfig.postsPerPage } }),
    getIsPostFavorite: (id: number): Response<boolean> => api.get(endpointConfig(`/posts/${id}/favorite`)),
};

export default postsService;
