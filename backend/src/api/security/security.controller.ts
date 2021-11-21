import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Redirect, UseGuards, ValidationPipe } from '@nestjs/common';

import { appConfig } from '../../config/app.config';
import { User } from '../../shared/decorators/users.decorator';
import { AuthGuard } from '../../shared/guards/auth.guards';
import { UserEntity } from '../users/entities/users.entity';
import { AuthRedirectPayload } from '../users/users.interface';

import { RestoreEmailDto } from './dto/restore-email.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { EmailType } from './security.interface';
import { SecurityService } from './security.service';

@Controller('security')
export class SecurityController {
    constructor(private readonly securityService: SecurityService) {}

    @Get('confirm-email')
    @Redirect()
    async verifyEmail(
        @Query('token') token: string,
        @Query('type', ValidationPipe) type: EmailType = EmailType.CHANGE_EMAIL,
    ): Promise<AuthRedirectPayload> {
        const isValid = await this.securityService.verifyEmail(token);
        return { url: `${appConfig.baseUrl}/verify/${isValid ? 'success' : 'error'}?type=${type}` };
    }

    @Get('restore-email')
    @Redirect()
    async restoreEmail(
        @Query('token') token: string,
        @Query('type', ValidationPipe) type: EmailType = EmailType.CHANGE_EMAIL,
    ): Promise<AuthRedirectPayload> {
        const isValid = await this.securityService.restoreEmail(token);
        return { url: `${appConfig.baseUrl}/verify/${isValid ? 'success' : 'error'}?type=${type}` };
    }

    @Post('restore-password')
    async changePassword(@Body() restorePasswordDto: RestorePasswordDto): Promise<void> {
        return await this.securityService.changePassword(restorePasswordDto);
    }

    @Post('email')
    @UseGuards(AuthGuard)
    async sendNewEmail(@User() user: UserEntity): Promise<void> {
        await this.securityService.sendConfirmEmail(user);
    }

    @Post('password')
    async sendResetPasswordEmail(@Body() restorePasswordDto: RestoreEmailDto): Promise<void> {
        await this.securityService.sendChangePasswordEmail(restorePasswordDto);
    }
}
