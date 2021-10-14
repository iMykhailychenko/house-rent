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

import { User } from '../../decorators/users.decorator';
import { AuthGuard } from '../../guards/auth.guards';
import { Pagination } from '../../interfaces/app.interface';
import { LoginInterface } from '../../interfaces/users.interface';

import CreateUserDto from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { RoleDto } from './dto/update-role.dto';
import UpdateUserDto from './dto/update-user.dto';
import { UserEntity } from './entities/users.entity';
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

    @Get(':userId')
    async findById(@Param('userId', ParseIntPipe) userId: number): Promise<UserEntity> {
        return await this.userService.findById(userId);
    }

    @Put('role')
    @UseGuards(AuthGuard)
    async updateUserRole(
        @User('id') userId: number,
        @Body(new ValidationPipe({ transform: true })) roleDto: RoleDto,
    ): Promise<UserEntity> {
        return await this.userService.updateUserRole(userId, roleDto);
    }

    @Put('')
    @UseGuards(AuthGuard)
    async updateUser(
        @User('id') userId: number,
        @Body(new ValidationPipe({ transform: true })) updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        return await this.userService.updateUser(userId, updateUserDto);
    }
}
