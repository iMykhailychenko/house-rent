import axios, { AxiosResponse } from 'axios';

import endpointConfig from '../../../config/endpoint.config';

import { IAuthResponse, IJoinPayload, ILoginPayload } from './auth.interface';

const authServices = {
    login: (body: ILoginPayload): Promise<AxiosResponse<IAuthResponse>> => axios.post(endpointConfig('/auth/login'), body),
    join: (body: IJoinPayload): Promise<AxiosResponse<void>> => axios.post(endpointConfig('/auth/join'), body),
};

export default authServices;
