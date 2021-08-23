import axios, { AxiosResponse } from 'axios';

import endpoints from '../../../config/endpoints';

import { IUser } from './profile.interface';

const profileServices = {
    getProfileInfo: (): Promise<AxiosResponse<IUser>> => axios.get(endpoints.profile.getUserInfo),
};

export default profileServices;
