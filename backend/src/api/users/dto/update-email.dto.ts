import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

import { UserRole } from '../entities/users.entity';

export class EmailDto {
    @IsEnum(UserRole, { each: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
