import axios, { AxiosResponse } from 'axios';

import endpoint from '../../../config/endpoint';

export const mediaServices = {
    upload: (body: FormData): Promise<AxiosResponse<void>> => axios.post(endpoint('/media/upload'), body),
};
