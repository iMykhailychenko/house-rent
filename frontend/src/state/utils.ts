import { ErrorState } from './interfaces/common';

export const formatSeverError = (error: Error & { status?: number; message?: string }): ErrorState => ({
    status: error.status,
    message: error.message || 'something_went_wrong',
});
