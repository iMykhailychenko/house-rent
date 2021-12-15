import endpointConfig from '../../../config/endpoint.config';
import { IUser, Response } from '../../../interfaces';
import api from '../../../utils/interceptors';

const userServices = {
    getUserInfo: (id: number): Response<IUser> => api.get(endpointConfig(`/users/${id}`)),
};

export default userServices;
