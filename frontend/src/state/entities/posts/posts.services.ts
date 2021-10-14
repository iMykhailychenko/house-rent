import axios from 'axios';
import queryString from 'query-string';

import endpointConfig from '../../../config/endpoint.config';
import uiConfig from '../../../config/ui.config';
import { Pagination, Params, Response } from '../../../interfaces';

import { IEditPostPayload, INewPostPayload, IPost, IUserPostsListPayload } from './posts.interface';

const postsServices = {
    singlePost: (id: number): Response<IPost> => {
        const path = axios.defaults.headers.common.Authorization ? '/posts/' : '/posts/read/';
        return axios.get(endpointConfig(path + id));
    },
    postsList: (page: number, query: Params = {}): Response<Pagination<IPost>> => {
        const path = axios.defaults.headers.common.Authorization ? '/posts/?' : '/posts/read/?';
        return axios.get(
            endpointConfig(
                path +
                    queryString.stringify(
                        { page, limit: uiConfig.postsPerPage, ...query },
                        { skipNull: true, arrayFormat: 'comma' },
                    ),
            ),
        );
    },
    getUserPostsList: (data: IUserPostsListPayload, query: Params): Response<Pagination<IPost>> => {
        const path = axios.defaults.headers.common.Authorization ? '/posts/users' : '/posts/read/users';
        return axios.get(
            endpointConfig(
                `${path}/${data.userId}/?${queryString.stringify(
                    { limit: uiConfig.postsPerPage, page: data.page, ...query },
                    { skipNull: true },
                )}`,
            ),
        );
    },
    newPost: (body: INewPostPayload): Response<IPost> => axios.post(endpointConfig('/posts'), body),
    updatePost: ({ id, body }: IEditPostPayload): Response<IPost> => axios.put(endpointConfig(`/posts/${id}`), body),
    toggleFavorite: (id: number): Response<void> => axios.put(endpointConfig(`/favorite/${id}`)),
};

export default postsServices;
