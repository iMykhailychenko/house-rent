import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { IUser, Response } from '../../../interfaces';

const userServices = {
    getUserInfo: (id: number): Response<IUser> => axios.get(endpointConfig(`/users/profile/${id}`)),
};

export default userServices;
