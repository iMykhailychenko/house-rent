import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { UserRole } from '../entities/users.entity';

export class UpdateUserDto {
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
    @IsNotEmpty()
    @IsOptional()
    @IsNotEmpty()
    avatar: string;
}
