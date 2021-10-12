import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UsersService } from '../api/users/users.service';
import authConfig from '../config/auth.config';
import { AuthRequest } from '../interfaces/users.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService) {}

    async use(req: AuthRequest, res: Response, next: NextFunction) {
        if (!req.get('Authorization')) {
            req.user = null;
            next();
            return;
        }

        const token = req.get('Authorization').replace('Bearer ', '');

        try {
            const decoded = jwt.verify(token, authConfig.accessKey);
            req.user = await this.userService.findById(decoded.id);
        } catch (error) {
            req.user = null;
            next();
            return;
        }

        next();
    }
}
