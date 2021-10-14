import { IsEnum, IsNotEmpty, MinLength } from 'class-validator';

import { UserRole } from '../entities/users.entity';

export class RoleDto {
    @IsEnum(UserRole, { each: true })
    @MinLength(1)
    @IsNotEmpty()
    role: UserRole[];
}
