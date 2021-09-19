import ErrorNormalize from './errorNormalize';

const errorsMap: { [key: string]: string } = {
    400: 'Bad Request',
    403: 'Forbidden',
    404: 'Not Found',
};

const errorCatch =
    (code?: number, message?: string): ((error: Error) => void) =>
    (error: Error): void => {
        if (process.env.NODE_ENV !== 'test') console.log(error.message);
        throw new ErrorNormalize(code, message || errorsMap[code] || error.message);
    };

export default errorCatch;
