import { Controller, Get, Post, Query, Redirect, UseGuards } from '@nestjs/common';

import { appConfig } from '../../config/app.config';
import { User } from '../../shared/decorators/users.decorator';
import { AuthGuard } from '../../shared/guards/auth.guards';
import { UserEntity } from '../users/entities/users.entity';
import { AuthRedirectPayload } from '../users/users.interface';

import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
    constructor(private readonly securityService: SecurityService) {}

    @Get('verify')
    @Redirect()
    async verifyEmail(@Query('token') token: string): Promise<AuthRedirectPayload> {
        const isValid = await this.securityService.verifyEmail(token);
        return { url: `${appConfig.baseUrl}/verify/${isValid ? 'success' : 'error'}` };
    }

    @Post('email')
    @UseGuards(AuthGuard)
    async sendNewEmail(@User() user: UserEntity): Promise<void> {
        await this.securityService.sendEmail(user);
    }
}
