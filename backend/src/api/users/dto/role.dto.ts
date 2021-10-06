import { IsEnum } from 'class-validator';
import { UserRole } from '../users.entity';

export class Role {
    @IsEnum(UserRole, { each: true })
    role: UserRole[];
}
