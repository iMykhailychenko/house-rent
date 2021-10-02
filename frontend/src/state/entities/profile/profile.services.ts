import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { Response } from '../../../interfaces';

import { IUser } from './profile.interface';

const profileServices = {
    getProfileInfo: (): Response<IUser> => axios.get(endpointConfig('/users/profile')),
};

export default profileServices;
