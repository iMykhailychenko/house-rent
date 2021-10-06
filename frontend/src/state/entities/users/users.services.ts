import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { IUser, Response, UserRole } from '../../../interfaces';

const userServices = {
    getUserInfo: (id: number): Response<IUser> => axios.get(endpointConfig(`/users/${id}`)),
    updateUserRole: (id: number, role: UserRole[]): Response<void> => axios.put(endpointConfig(`/users/${id}/role`), { role }),
};

export default userServices;
