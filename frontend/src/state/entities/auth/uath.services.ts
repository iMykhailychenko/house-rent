import axios, { AxiosResponse } from 'axios';

import endpoints from '../../../config/endpoints';

import { IAuthResponse, IJoinPayload, ILoginPayload } from './auth.interface';

const authServices = {
    login: (body: ILoginPayload): Promise<AxiosResponse<IAuthResponse>> => axios.post(endpoints.auth.login, body),
    join: (body: IJoinPayload): Promise<AxiosResponse<void>> => axios.post(endpoints.auth.join, body),
};

export default authServices;
