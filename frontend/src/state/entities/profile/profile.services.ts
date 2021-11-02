import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { IUser, Response, UserRole } from '../../../interfaces';

import { IUpdateProfilePayload } from './profile.interface';

const profileServices = {
    getProfileInfo: (): Response<IUser> => axios.get(endpointConfig('/users/profile')),
    updateProfile: (body: IUpdateProfilePayload): Response<IUser> => axios.put(endpointConfig('/users'), body),
    updateProfileRole: (role: UserRole[]): Response<void> => axios.put(endpointConfig('/users/role'), { role }),
};

export default profileServices;
