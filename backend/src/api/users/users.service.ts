import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { authConfig } from '../../config/auth.config';
import { Pagination } from '../../shared/interfaces/interface';
import { PostEntity } from '../posts/entities/posts.entity';
import { POST_STATUS } from '../posts/posts.interface';
import { SecurityService } from '../security/security.service';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { EmailDto } from './dto/update-email.dto';
import { RoleDto } from './dto/update-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity, UserRole } from './entities/users.entity';
import { LoginInterface } from './users.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        private readonly securityService: SecurityService,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ email: createUserDto.email });
        if (user) {
            throw new HttpException(createUserDto.email + ' email are taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        const savedUser = await this.userRepository.save(newUser);
        await this.securityService.sendConfirmEmail(savedUser);

        return savedUser;
    }

    async login(loginDto: LoginDto): Promise<LoginInterface> {
        const user = await this.userRepository.findOne({ email: loginDto.email }, { select: ['id', 'password'] });
        if (!user) {
            throw new HttpException('Credentials not valid', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (!(await bcrypt.compare(loginDto.password, user.password))) {
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
        if (user.role.includes(UserRole.USER) && !roleDto.role.includes(UserRole.USER)) {
            const posts = await this.postRepository.find({
                relations: ['user'],
                where: {
                    status: POST_STATUS.ACTIVE,
                    user: {
                        id: userId,
                    },
                },
            });

            for await (const post of posts) {
                post.status = POST_STATUS.ARCHIVE;
                await this.postRepository.save(post);
            }
        }
        user.role = roleDto.role;
        return await this.userRepository.save(user);
    }

    async updateUserEmail(userId: number, emailDto: EmailDto): Promise<UserEntity> {
        const user = await this.findById(userId);
        const oldEmail = user.email;
        user.email = emailDto.email;
        user.isEmailVerified = false;
        const newUser = await this.userRepository.save(user);
        await this.securityService.sendChangeEmail(newUser, oldEmail);

        return newUser;
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(userId);
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
    }
}
