import { Handler, NextFunction, Request, Response } from 'express';

const errorWrapper =
    (callback: Handler): Handler =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await callback(req, res, next);
        } catch (err) {
            res.status(err.code || 500).send({
                massage: err.message || 'Internal error',
            });
        }
    };

export default errorWrapper;
