import axios, { AxiosResponse } from 'axios';

import endpoint from '../../../config/endpoint';

import { INewPostPayload } from './posts.interface';

const postsServices = {
    newPost: (body: INewPostPayload): Promise<AxiosResponse<void>> => axios.post(endpoint('/posts'), body),
};

export default postsServices;
