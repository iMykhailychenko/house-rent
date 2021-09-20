import ErrorNormalize from './errorNormalize';

const errorsMap: { [key: string]: string } = {
    400: 'bad request',
    403: 'forbidden',
    404: 'not found',
};

const errorCatch =
    (code?: number, message?: string): ((error: Error) => void) =>
    (error: Error): Error => {
        // console.log(error.message);
        throw new ErrorNormalize(code, message || errorsMap[code] || error.message);
    };

export default errorCatch;
