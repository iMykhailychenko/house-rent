import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { User } from '../../decorators/users.decorator';
import { AuthGuard } from '../../guards/auth.guards';
import { Pagination } from '../../interfaces/app.interface';
import { LoginInterface } from '../../interfaces/users.interface';

import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('')
    @UsePipes(new ValidationPipe({ transform: true }))
    @HttpCode(HttpStatus.NO_CONTENT)
    async join(@Body() createUserDto: CreateUserDto): Promise<void> {
        await this.userService.createUser(createUserDto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() createUserDto: CreateUserDto): Promise<LoginInterface> {
        return await this.userService.login(createUserDto);
    }

    @Get('')
    async findAll(@Query('page') page = 1, @Query('limit') limit = 1): Promise<Pagination<UserEntity>> {
        return await this.userService.findAll(page, limit);
    }

    @Get(':userId')
    async findById(@Param('userId') userId: number): Promise<UserEntity> {
        return await this.userService.findById(userId);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async getCurrentUser(@User() user: UserEntity): Promise<UserEntity> {
        return user;
    }

    @Put('')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateUser(@User('id') userId: number, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
        return await this.userService.updateUser(userId, updateUserDto);
    }
}
