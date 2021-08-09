import { IsEmail, Length } from 'class-validator';

export class AuthJoin {
    @Length(1, 40)
    firstName: string;

    @Length(1, 40)
    lastName: string;

    @IsEmail()
    email: string;

    @Length(6, 40)
    password: string;
}
