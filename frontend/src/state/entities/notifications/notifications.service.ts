import endpointConfig from '../../../config/endpoint.config';
import uiConfig from '../../../config/ui.config';
import { Pagination, Response } from '../../../interfaces';
import api from '../../../utils/interceptors';

import { INotification } from './notifications.interface';

export const notificationsService = {
    get: (page: number): Response<Pagination<INotification>> =>
        api.get(endpointConfig('/notifications'), { params: { page, limit: uiConfig.notificationsPerPage } }),
    count: (): Response<number> => api.get(endpointConfig('/notifications/count')),
    deleteAll: (): Response<void> => api.delete(endpointConfig('/notifications')),
    deleteById: (id: number): Response<void> => api.delete(endpointConfig('/notifications/' + id)),
};
