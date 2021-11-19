import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { authConfig } from '../../config/auth.config';
import { UserEntity } from '../users/entities/users.entity';

import { EmailType } from './security.interface';

const ONE_HOUR_IN_MS = 3_600_000;
const ONE_WEEK_IN_MS = 604_800_000;

@Injectable()
export class SecurityService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async sendEmail(user: UserEntity): Promise<void> {
        const URL = authConfig.emailServiceHost + '/auth/' + EmailType.CONFIRM_EMAIL;
        const { status } = await axios.post(URL, {
            email: user.email,
            token: jwt.sign({ id: user.id, exp: Date.now() + ONE_HOUR_IN_MS }, authConfig.emailSecret),
            first_name: user.firstName,
            last_name: user.lastName,
        });

        if (status > 299) {
            throw new HttpException('Email service is unavailable', HttpStatus.BAD_GATEWAY);
        }
    }

    async sendChangeEmail(user: UserEntity, oldEmail: string): Promise<void> {
        const URL = authConfig.emailServiceHost + '/auth/' + EmailType.CHANGE_EMAIL;
        const { status } = await axios.post(URL, {
            email: user.email,
            old_email: oldEmail,
            token: jwt.sign({ id: user.id, exp: Date.now() + ONE_HOUR_IN_MS }, authConfig.emailSecret),
            recover_token: jwt.sign({ id: user.id, exp: Date.now() + ONE_WEEK_IN_MS }, authConfig.resetPasswordSecret),
            first_name: user.firstName,
            last_name: user.lastName,
        });

        if (status > 299) {
            throw new HttpException('Email service is unavailable', HttpStatus.BAD_GATEWAY);
        }
    }

    async verifyEmail(token: string): Promise<boolean> {
        try {
            const decoded = jwt.verify(token, authConfig.emailSecret);
            const user = await this.userRepository.findOne(+decoded.id);

            if (!user) return false;

            user.isEmailVerified = true;
            await this.userRepository.save(user);
            return true;
        } catch (e) {
            return false;
        }
    }
}
