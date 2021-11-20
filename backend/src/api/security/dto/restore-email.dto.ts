import { IsEmail, IsNotEmpty } from 'class-validator';

export class RestoreEmailDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
