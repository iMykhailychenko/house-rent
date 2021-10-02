import axios from 'axios';
import queryString from 'query-string';

import endpointConfig from '../../../config/endpoint.config';
import uiConfig from '../../../config/ui.config';
import { Pagination, Response } from '../../../interfaces';

import { ALL_STATUSES, IEditPostPayload, INewPostPayload, IPost, IUserPostsListPayload } from './posts.interface';

const postsServices = {
    newPost: (body: INewPostPayload): Response<IPost> => axios.post(endpointConfig('/posts'), body),
    updatePost: ({ id, body }: IEditPostPayload): Response<IPost> => axios.put(endpointConfig(`/posts/${id}`), body),
    singlePost: (id: number): Response<IPost> => axios.get(endpointConfig(`/posts/${id}`)),
    postsList: (page: number): Response<Pagination<IPost>> =>
        axios.get(endpointConfig(`/posts/?page=${page}&limit=${uiConfig.postsPerPage}`)),
    getUserPostsList: ({
        userId,
        params: { page = 1, limit = uiConfig.postsPerPage, status = ALL_STATUSES },
    }: IUserPostsListPayload): Response<Pagination<IPost>> => {
        return axios.get(endpointConfig(`/posts/users/${userId}/?${queryString.stringify({ page, limit, status })}`));
    },
    toggleFavorite: (id: number): Response<void> => axios.put(endpointConfig(`/favorite/${id}`)),
};

export default postsServices;
