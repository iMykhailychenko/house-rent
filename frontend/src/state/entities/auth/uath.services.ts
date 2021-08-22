import { AxiosResponse } from 'axios';

import endpoints from '../../../config/endpoints';
import authInterceptor from '../../../interceptors/interceptors';

import { IAuthResponse, IJoinPayload, ILoginPayload } from './auth.interface';

const authServices = {
    login: (body: ILoginPayload): Promise<AxiosResponse<IAuthResponse>> => authInterceptor.post(endpoints.auth.login, body),
    join: (body: IJoinPayload): Promise<AxiosResponse<void>> => authInterceptor.post(endpoints.auth.join, body),
};

export default authServices;
