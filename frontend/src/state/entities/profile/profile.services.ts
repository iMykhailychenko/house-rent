import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { IUser, Response, UserRole } from '../../../interfaces';

const profileServices = {
    getProfileInfo: (): Response<IUser> => axios.get(endpointConfig('/users/profile')),
    updateProfileRole: (role: UserRole[]): Response<void> => axios.put(endpointConfig('/users/role'), { role }),
};

export default profileServices;
