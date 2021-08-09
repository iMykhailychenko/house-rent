interface IError extends Error {
    code: number;
}

class ErrorNormalize extends Error implements IError {
    code: number;

    constructor(code = 500, message = 'Internal server error') {
        super(message);
        this.code = code;
    }
}

export default ErrorNormalize;
