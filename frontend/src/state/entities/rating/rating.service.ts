import endpoint from '../../../config/endpoint.config';
import { Response } from '../../../interfaces';
import api from '../../../utils/interceptors';

import { RatingPayload, UserRating } from './rating.interface';

export const ratingService = {
    get: (userId: number): Response<UserRating> => api.get(endpoint('/rating/' + userId)),
    update: (userId: number, body: RatingPayload): Response<void> => api.put(endpoint('/rating/' + userId), body),
    create: (userId: number, body: RatingPayload): Response<void> => api.post(endpoint('/rating/' + userId), body),
};
