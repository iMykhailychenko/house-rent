import axios, { AxiosResponse } from 'axios';

import endpoint from '../../../config/endpoint';

import { IAuthResponse, IJoinPayload, ILoginPayload } from './auth.interface';

const authServices = {
    login: (body: ILoginPayload): Promise<AxiosResponse<IAuthResponse>> => axios.post(endpoint('/auth/login'), body),
    join: (body: IJoinPayload): Promise<AxiosResponse<void>> => axios.post(endpoint('/auth/join'), body),
};

export default authServices;
