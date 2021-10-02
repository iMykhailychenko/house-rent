import axios, { AxiosRequestConfig } from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { Response } from '../../../interfaces';

import { IMediaResponse } from './media.interface';

export const mediaServices = {
    upload: (body: FormData, requestConfig: AxiosRequestConfig): Response<IMediaResponse> =>
        axios.post(endpointConfig('/media'), body, requestConfig),
};
