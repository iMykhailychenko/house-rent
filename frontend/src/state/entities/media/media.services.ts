import { AxiosRequestConfig } from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { Response } from '../../../interfaces';
import api from '../../../utils/interceptors';

import { IMediaResponse } from './media.interface';

export const mediaServices = {
    upload: (body: FormData, requestConfig: AxiosRequestConfig): Response<IMediaResponse> =>
        api.post(endpointConfig('/media'), body, requestConfig),
};
