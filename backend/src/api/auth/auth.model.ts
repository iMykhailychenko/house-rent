import { Request, Response } from 'express';

export const joinController = async (req: Request, res: Response): Promise<void> => {
    res.send('auth');
};

export const loginController = async (req: Request, res: Response): Promise<void> => {
    res.send('login');
};
