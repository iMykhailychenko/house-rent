import axios, { AxiosResponse } from 'axios';

import endpoint from '../../../config/endpoint';

import { IEditPostPayload, INewPostPayload, IPost } from './posts.interface';

const postsServices = {
    newPost: (body: INewPostPayload): Promise<AxiosResponse<IPost>> => axios.post(endpoint('/posts'), body),
    updatePost: ({ id, body }: IEditPostPayload): Promise<AxiosResponse<IPost>> => axios.put(endpoint(`/posts/${id}`), body),
    singlePost: (id: number): Promise<AxiosResponse<IPost>> => axios.get(endpoint(`/posts/${id}`)),
};

export default postsServices;
