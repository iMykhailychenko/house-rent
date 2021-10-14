import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { Response } from '../../../interfaces';

import { IAuthResponse, IJoinPayload, ILoginPayload } from './auth.interface';

const authServices = {
    join: (body: IJoinPayload): Response<void> => axios.post(endpointConfig('/users'), body),
    login: (body: ILoginPayload): Response<IAuthResponse> => axios.post(endpointConfig('/users/login'), body),
};

export default authServices;
