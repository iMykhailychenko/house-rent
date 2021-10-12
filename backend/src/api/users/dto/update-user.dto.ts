import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { UserRole } from '../entities/users.entity';

export default class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsNotEmpty()
    avatar: string;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(UserRole, { each: true })
    role: UserRole[] = [UserRole.USER];
}
