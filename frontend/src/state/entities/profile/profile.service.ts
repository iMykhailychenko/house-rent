import endpointConfig from '../../../config/endpoint.config';
import { IUser, Response, UserRole } from '../../../interfaces';
import api from '../../../utils/interceptors';

import { ChangeEmailPayload, IUpdateProfilePayload } from './profile.interface';

const profileService = {
    getProfileInfo: (): Response<IUser> => api.get(endpointConfig('/users/profile')),
    updateProfile: (body: IUpdateProfilePayload): Response<IUser> => api.put(endpointConfig('/users'), body),
    updateProfileRole: (role: UserRole[]): Response<void> => api.put(endpointConfig('/users/role'), { role }),
    changeEmail: (bode: ChangeEmailPayload): Response<IUser> => api.put(endpointConfig('/users/email'), bode),
    sendNewEmail: (): Response<void> => api.post(endpointConfig('/security/email')),
};

export default profileService;
