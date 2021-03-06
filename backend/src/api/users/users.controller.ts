import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';

import { User } from '../../shared/decorators/users.decorator';
import { AuthGuard } from '../../shared/guards/auth.guards';
import { Pagination } from '../../shared/interfaces/interface';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { EmailDto } from './dto/update-email.dto';
import { RoleDto } from './dto/update-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/users.entity';
import { LoginInterface } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('')
    @HttpCode(HttpStatus.NO_CONTENT)
    async join(@Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto): Promise<void> {
        await this.userService.createUser(createUserDto);
    }

    @Post('login')
    async login(@Body(new ValidationPipe({ transform: true })) loginDto: LoginDto): Promise<LoginInterface> {
        return await this.userService.login(loginDto);
    }

    @Get('')
    async findAll(
        @Query('page', ParseIntPipe) page = 1,
        @Query('limit', ParseIntPipe) limit = 1,
    ): Promise<Pagination<UserEntity>> {
        return await this.userService.findAll(page, limit);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async getCurrentUser(@User() user: UserEntity): Promise<UserEntity> {
        return user;
    }

    @Put('role')
    @UseGuards(AuthGuard)
    async updateUserRole(
        @User('id') userId: number,
        @Body(new ValidationPipe({ transform: true })) roleDto: RoleDto,
    ): Promise<UserEntity> {
        return await this.userService.updateUserRole(userId, roleDto);
    }

    @Put('email')
    @UseGuards(AuthGuard)
    async updateUserEmail(
        @User('id') userId: number,
        @Body(new ValidationPipe({ transform: true })) emailDto: EmailDto,
    ): Promise<UserEntity> {
        return await this.userService.updateUserEmail(userId, emailDto);
    }

    @Put('')
    @UseGuards(AuthGuard)
    async updateUser(
        @User('id') userId: number,
        @Body(new ValidationPipe({ transform: true })) updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        return await this.userService.updateUser(userId, updateUserDto);
    }

    @Get(':userId')
    async findById(@Param('userId', ParseIntPipe) userId: number): Promise<UserEntity> {
        return await this.userService.findById(userId);
    }
}
