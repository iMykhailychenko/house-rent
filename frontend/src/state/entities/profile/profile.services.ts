import axios, { AxiosResponse } from 'axios';

import endpointConfig from '../../../config/endpoint.config';

import { IUser } from './profile.interface';

const profileServices = {
    getProfileInfo: (): Promise<AxiosResponse<IUser>> => axios.get(endpointConfig('/users/profile')),
};

export default profileServices;
