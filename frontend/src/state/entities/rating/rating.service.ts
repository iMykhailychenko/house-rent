import endpoint from '../../../config/endpoint.config';
import { Response } from '../../../interfaces';
import api from '../../../utils/interceptors';

import { ICanRate, RatingPayload, UserRating } from './rating.interface';

export const ratingService = {
    get: (userId: number): Response<UserRating> => api.get(endpoint('/rating/' + userId)),
    canRate: (userId: number): Response<ICanRate> => api.get(endpoint(`/rating/${userId}/can-rate`)),
    update: ({ userId, value }: RatingPayload): Response<void> => api.put(endpoint(`/rating/${userId}`), { value }),
    create: ({ userId, value }: RatingPayload): Response<void> => api.post(endpoint(`/rating/${userId}`), { value }),
};
