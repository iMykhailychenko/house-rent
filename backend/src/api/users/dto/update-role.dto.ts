import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';

import { UserRole } from '../entities/users.entity';

export class RoleDto {
    @IsEnum(UserRole, { each: true })
    @IsArray()
    @IsNotEmpty()
    role: UserRole[];
}
