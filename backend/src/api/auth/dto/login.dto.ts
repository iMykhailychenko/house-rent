import { IsEmail, Length } from 'class-validator';

export class AuthLogin {
    @IsEmail()
    email: string;

    @Length(6, 40)
    password: string;
}
