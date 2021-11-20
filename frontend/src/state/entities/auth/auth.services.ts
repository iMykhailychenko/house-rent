import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { Response } from '../../../interfaces';

import {
    IAuthResponse,
    IJoinPayload,
    ILoginPayload,
    IRestorePasswordEmailPayload,
    IRestorePasswordPayload,
} from './auth.interface';

const authServices = {
    join: (body: IJoinPayload): Response<void> => axios.post(endpointConfig('/users'), body),
    login: (body: ILoginPayload): Response<IAuthResponse> => axios.post(endpointConfig('/users/login'), body),
    restorePassword: (body: IRestorePasswordPayload): Response<void> =>
        axios.post(endpointConfig('/security/restore-password'), body),
    restorePasswordEmail: (body: IRestorePasswordEmailPayload): Response<void> =>
        axios.post(endpointConfig('/security/password'), body),
};

export default authServices;
