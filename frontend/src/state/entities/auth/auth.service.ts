import endpointConfig from '../../../config/endpoint.config';
import { Response } from '../../../interfaces';
import api from '../../../utils/interceptors';

import {
    IAuthResponse,
    IJoinPayload,
    ILoginPayload,
    IRestorePasswordEmailPayload,
    IRestorePasswordPayload,
} from './auth.interface';

const authService = {
    join: (body: IJoinPayload): Response<void> => api.post(endpointConfig('/users'), body),
    login: (body: ILoginPayload): Response<IAuthResponse> => api.post(endpointConfig('/users/login'), body),
    restorePassword: (body: IRestorePasswordPayload): Response<void> =>
        api.post(endpointConfig('/security/restore-password'), body),
    restorePasswordEmail: (body: IRestorePasswordEmailPayload): Response<void> =>
        api.post(endpointConfig('/security/password'), body),
};

export default authService;
