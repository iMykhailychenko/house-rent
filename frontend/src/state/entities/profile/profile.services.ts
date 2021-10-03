import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import { IUser, Response } from '../../../interfaces';

const profileServices = {
    getProfileInfo: (): Response<IUser> => axios.get(endpointConfig('/users/profile')),
};

export default profileServices;
