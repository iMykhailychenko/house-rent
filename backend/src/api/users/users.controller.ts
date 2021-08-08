import { Request, Response } from 'express';

export const usersListController = async (req: Request, res: Response): Promise<void> => {
    res.send('usersListController');
};
