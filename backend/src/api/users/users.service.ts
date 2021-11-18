import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { authConfig } from '../../config/auth.config';
import { Pagination } from '../../shared/interfaces/interface';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { EmailDto } from './dto/update-email.dto';
import { RoleDto } from './dto/update-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/users.entity';
import { EmailType, LoginInterface } from './users.interface';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ email: createUserDto.email });
        if (user) {
            throw new HttpException(createUserDto.email + ' email are taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        const savedUser = await this.userRepository.save(newUser);
        await this.sendEmail(savedUser);

        return savedUser;
    }

    async login(loginDto: LoginDto): Promise<LoginInterface> {
        const user = await this.userRepository.findOne({ email: loginDto.email }, { select: ['id', 'password'] });
        if (!user) {
            throw new HttpException('Credentials not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (!bcrypt.compare(loginDto.password, user.password)) {
            throw new HttpException('Credentials not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const oneMonthInMS = 2_629_800_000;
        return { accessToken: jwt.sign({ id: user.id, exp: Date.now() + oneMonthInMS }, authConfig.accessKey) };
    }

    async findById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne(id);
    }

    async findAll(page: number, limit: number): Promise<Pagination<UserEntity>> {
        const [result, total] = await this.userRepository.findAndCount({
            take: limit,
            skip: limit * (page - 1),
        });

        return {
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: +page,
            data: result,
        };
    }

    async updateUserRole(userId: number, roleDto: RoleDto): Promise<UserEntity> {
        const user = await this.findById(userId);
        user.role = roleDto.role;
        return await this.userRepository.save(user);
    }

    async updateUserEmail(userId: number, emailDto: EmailDto): Promise<UserEntity> {
        const user = await this.findById(userId);
        const oldEmail = user.email;
        user.email = emailDto.email;
        user.isEmailVerified = false;
        const newUser = await this.userRepository.save(user);
        await this.sendChangeEmail(newUser, oldEmail);

        return newUser;
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(userId);
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async sendEmail(user: UserEntity): Promise<void> {
        const oneHourInMS = 3_600_000;
        const { status } = await axios.post(authConfig.emailServiceHost + EmailType.CONFIR_EMAIL, {
            email: user.email,
            token: jwt.sign({ id: user.id, exp: Date.now() + oneHourInMS }, authConfig.emailSecret),
            first_name: user.firstName,
            last_name: user.lastName,
        });

        if (status > 299) {
            throw new HttpException('Email service is unavailable', HttpStatus.BAD_GATEWAY);
        }
    }

    async sendChangeEmail(user: UserEntity, oldEmail: string): Promise<void> {
        const oneHourInMS = 3_600_000;
        const { status } = await axios.post(authConfig.emailServiceHost + EmailType.CHANGE_EMAIL, {
            email: user.email,
            old_email: oldEmail,
            token: jwt.sign({ id: user.id, exp: Date.now() + oneHourInMS }, authConfig.emailSecret),
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
            const user = await this.findById(+decoded.id);

            if (!user) return false;

            user.isEmailVerified = true;
            await this.userRepository.save(user);
            return true;
        } catch (e) {
            return false;
        }
    }
}
