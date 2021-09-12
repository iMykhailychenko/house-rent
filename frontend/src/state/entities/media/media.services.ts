import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import endpointConfig from '../../../config/endpoint.config';

import { IMediaResponse } from './media.interface';

export const mediaServices = {
    upload: (body: FormData, requestConfig: AxiosRequestConfig): Promise<AxiosResponse<IMediaResponse>> =>
        axios.post(endpointConfig('/media'), body, requestConfig),
};
