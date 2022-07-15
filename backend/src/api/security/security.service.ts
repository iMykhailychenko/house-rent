import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { authConfig } from '../../config/auth.config';
import { UserEntity } from '../users/entities/users.entity';

import { RestoreEmailDto } from './dto/restore-email.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { EmailType } from './security.interface';

const ONE_HOUR_IN_MS = 3_600_000;
const ONE_WEEK_IN_MS = 604_800_000;

@Injectable()
export class SecurityService {
    private logger: Logger = new Logger('EmailService');

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private httpService: HttpService,
    ) {}

    async sendConfirmEmail(user: UserEntity): Promise<void> {
        const URL = authConfig.emailServiceHost + EmailType.CONFIRM_EMAIL;
        this.logger.log('Request to ' + URL);
        this.httpService
            .post(URL, {
                email: user.email,
                token: jwt.sign({ id: user.id, exp: Date.now() + ONE_HOUR_IN_MS }, authConfig.emailSecret),
                first_name: user.firstName,
                last_name: user.lastName,
            })
            .subscribe({
                next: ({ status }) => {
                    if (status > 299) {
                        this.logger.error('Error on ' + URL + ' | status: ' + status);
                        throw new HttpException('Email service is unavailable', HttpStatus.BAD_GATEWAY);
                    }
                },
                error: () => {
                    this.logger.error('Error on ' + URL);
                    throw new HttpException('Email service is unavailable', HttpStatus.BAD_GATEWAY);
                },
            });
    }

    async sendChangeEmail(user: UserEntity, oldEmail: string): Promise<void> {
        const URL = authConfig.emailServiceHost + EmailType.CHANGE_EMAIL;
        this.logger.log('Request to ' + URL);
        this.httpService
            .post(URL, {
                email: user.email,
                old_email: oldEmail,
                token: jwt.sign({ id: user.id, exp: Date.now() + ONE_HOUR_IN_MS }, authConfig.emailSecret),
                recover_token: jwt.sign(
                    { id: user.id, email: oldEmail, exp: Date.now() + ONE_WEEK_IN_MS },
                    authConfig.resetPasswordSecret,
                ),
            })
            .subscribe({
                next: ({ status }) => {
                    if (status > 299) {
                        this.logger.error('Error on ' + URL + ' | status: ' + status);
                        throw new HttpException('Email service is unavailable', HttpStatus.BAD_GATEWAY);
                    }
                },
                error: () => {
                    this.logger.error('Error on ' + URL);
                    throw new HttpException('Email service is unavailable', HttpStatus.BAD_GATEWAY);
                },
            });
    }

    async sendChangePasswordEmail(restorePasswordDto: RestoreEmailDto): Promise<void> {
        const user = await this.userRepository.findOne({ email: restorePasswordDto.email });
        if (!user) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        const URL = authConfig.emailServiceHost + EmailType.CHANGE_PASSWORD;
        this.logger.log('Request to ' + URL);
        this.httpService
            .post(URL, {
                email: user.email,
                token: jwt.sign(
                    { id: user.id, email: user.email, exp: Date.now() + ONE_HOUR_IN_MS },
                    authConfig.resetPasswordSecret,
                ),
            })
            .subscribe({
                next: ({ status }) => {
                    if (status > 299) {
                        this.logger.error('Error on ' + URL + ' | status: ' + status);
                        throw new HttpException('Email service is unavailable', HttpStatus.BAD_GATEWAY);
                    }
                },
                error: () => {
                    this.logger.error('Error on ' + URL);
                    throw new HttpException('Email service is unavailable', HttpStatus.BAD_GATEWAY);
                },
            });
    }

    async verifyEmail(token: string): Promise<boolean> {
        try {
            const decoded = jwt.verify(token, authConfig.emailSecret);
            if (!+decoded.id || new Date() > new Date(decoded.exp)) return false;

            const user = await this.userRepository.findOne(+decoded.id);
            if (!user) return false;

            user.isEmailVerified = true;
            await this.userRepository.save(user);

            return true;
        } catch (e) {
            return false;
        }
    }

    async restoreEmail(token: string): Promise<boolean> {
        try {
            const decoded = jwt.verify(token, authConfig.resetPasswordSecret);
            if (!+decoded.id || !decoded.email || new Date() > new Date(decoded.exp)) return false;

            const user = await this.userRepository.findOne(+decoded.id);
            if (!user) return false;

            user.email = decoded.email;
            user.isEmailVerified = true;
            await this.userRepository.save(user);

            return true;
        } catch (e) {
            return false;
        }
    }

    async changePassword(restorePasswordDto: RestorePasswordDto): Promise<void> {
        const decoded = jwt.verify(restorePasswordDto.token, authConfig.resetPasswordSecret);
        if (!+decoded.id || !decoded.email || new Date() > new Date(decoded.exp)) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        const user = await this.userRepository.findOne(+decoded.id);
        if (!user) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        user.password = await bcrypt.hash(restorePasswordDto.password, authConfig.saltRounds);
        await this.userRepository.save(user);
    }
}
