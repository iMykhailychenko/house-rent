import axios, { AxiosResponse } from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { Pagination } from '../../../interfaces';

import { IEditPostPayload, INewPostPayload, IPost } from './posts.interface';

const postsServices = {
    newPost: (body: INewPostPayload): Promise<AxiosResponse<IPost>> => axios.post(endpointConfig('/posts'), body),
    updatePost: ({ id, body }: IEditPostPayload): Promise<AxiosResponse<IPost>> =>
        axios.put(endpointConfig(`/posts/${id}`), body),
    singlePost: (id: number): Promise<AxiosResponse<IPost>> => axios.get(endpointConfig(`/posts/${id}`)),
    postsList: (page: number): Promise<AxiosResponse<Pagination<IPost>>> => axios.get(endpointConfig(`/posts/?page=${page}`)),
};

export default postsServices;
