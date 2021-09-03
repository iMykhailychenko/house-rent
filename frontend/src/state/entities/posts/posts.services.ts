import axios, { AxiosResponse } from 'axios';

import endpoint from '../../../config/endpoint';

import { IEditPostPayload, INewPostPayload, INewPostResponse } from './posts.interface';

const postsServices = {
    newPost: (body: INewPostPayload): Promise<AxiosResponse<INewPostResponse>> => axios.post(endpoint('/posts'), body),
    editPost: ({ id, body }: IEditPostPayload): Promise<AxiosResponse<INewPostResponse>> =>
        axios.put(endpoint(`/posts/${id}`), body),
};

export default postsServices;
