import axios from 'axios';
import queryString from 'query-string';

import endpointConfig from '../../../config/endpoint.config';
import uiConfig from '../../../config/ui.config';
import { Pagination, Params, Response } from '../../../interfaces';

import { IEditPostPayload, INewPostPayload, IPost, IUserPostsListPayload } from './posts.interface';

const postsServices = {
    newPost: (body: INewPostPayload): Response<IPost> => axios.post(endpointConfig('/posts'), body),
    updatePost: ({ id, body }: IEditPostPayload): Response<IPost> => axios.put(endpointConfig(`/posts/${id}`), body),
    singlePost: (id: number): Response<IPost> => axios.get(endpointConfig(`/posts/${id}`)),
    postsList: (page: number, query: Params = {}): Response<Pagination<IPost>> =>
        axios.get(
            endpointConfig(
                `/posts/?${queryString.stringify(
                    { page, limit: uiConfig.postsPerPage, ...query },
                    { skipNull: true, arrayFormat: 'comma' },
                )}`,
            ),
        ),
    getUserPostsList: (data: IUserPostsListPayload, query: Params): Response<Pagination<IPost>> => {
        return axios.get(
            endpointConfig(
                `/posts/users/${data.userId}/?${queryString.stringify(
                    { limit: uiConfig.postsPerPage, page: data.page, ...query },
                    { skipNull: true },
                )}`,
            ),
        );
    },
    toggleFavorite: (id: number): Response<void> => axios.put(endpointConfig(`/favorite/${id}`)),
};

export default postsServices;
