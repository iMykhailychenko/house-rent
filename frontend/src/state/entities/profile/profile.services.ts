import axios, { AxiosResponse } from 'axios';

import endpoint from '../../../config/endpoint';

import { IUser } from './profile.interface';

const profileServices = {
    getProfileInfo: (): Promise<AxiosResponse<IUser>> => axios.get(endpoint('/users/profile')),
};

export default profileServices;
