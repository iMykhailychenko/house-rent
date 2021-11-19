import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { IUser, Response, UserRole } from '../../../interfaces';

import { ChangeEmailPayload, IUpdateProfilePayload } from './profile.interface';

const profileServices = {
    getProfileInfo: (): Response<IUser> => axios.get(endpointConfig('/users/profile')),
    updateProfile: (body: IUpdateProfilePayload): Response<IUser> => axios.put(endpointConfig('/users'), body),
    updateProfileRole: (role: UserRole[]): Response<void> => axios.put(endpointConfig('/users/role'), { role }),
    changeEmail: (bode: ChangeEmailPayload): Response<IUser> => axios.put(endpointConfig('/users/email'), bode),
    sendNewEmail: (): Response<void> => axios.post(endpointConfig('/security/email')),
};

export default profileServices;
