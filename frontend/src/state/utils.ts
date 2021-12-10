import { ErrorState } from './interfaces/common';

interface SeverError {
    message?: string;
    response?: {
        status: number;
        statusText: string;
    };
}

export const formatSeverError = (error: SeverError): ErrorState => ({
    status: error.response?.status,
    message: error.response?.statusText || error.message || 'something_went_wrong',
});
