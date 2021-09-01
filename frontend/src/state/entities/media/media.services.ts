import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import endpoint from '../../../config/endpoint';

import { IMediaResponse } from './media.interface';

export const mediaServices = {
    upload: (body: FormData, requestConfig: AxiosRequestConfig): Promise<AxiosResponse<IMediaResponse>> =>
        axios.post(endpoint('/media'), body, requestConfig),
};
