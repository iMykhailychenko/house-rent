import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import authConfig from '../../config/auth.config';
import { Pagination } from '../../shared/interfaces/interface';

import CreateUserDto from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RoleDto } from './dto/update-role.dto';
import UpdateUserDto from './dto/update-user.dto';
import { UserEntity } from './entities/users.entity';
import { LoginInterface } from './users.interface';

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
        return await this.userRepository.save(newUser);
    }

    async login(loginDto: LoginDto): Promise<LoginInterface> {
        const user = await this.userRepository.findOne({ email: loginDto.email }, { select: ['id', 'password'] });
        if (!user) {
            throw new HttpException('Credentials not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (!bcrypt.compare(loginDto.password, user.password)) {
            throw new HttpException('Credentials not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const oneMonthInMS = 30 * 24 * 60 * 60 * 1000;
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

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(userId);
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }
}
