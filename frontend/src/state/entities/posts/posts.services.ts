import axios, { AxiosResponse } from 'axios';

import endpoint from '../../../config/endpoint';

import { INewPostPayload, INewPostResponse } from './posts.interface';

const postsServices = {
    newPost: (body: INewPostPayload): Promise<AxiosResponse<INewPostResponse>> => axios.post(endpoint('/posts'), body),
};

export default postsServices;
