import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { Response } from '../../../interfaces';

import { IAuthResponse, IJoinPayload, ILoginPayload } from './auth.interface';

const authServices = {
    login: (body: ILoginPayload): Response<IAuthResponse> => axios.post(endpointConfig('/auth/login'), body),
    join: (body: IJoinPayload): Response<void> => axios.post(endpointConfig('/auth/join'), body),
};

export default authServices;
