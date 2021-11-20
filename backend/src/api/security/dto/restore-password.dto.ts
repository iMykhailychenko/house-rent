import { IsNotEmpty, IsString } from 'class-validator';

export class RestorePasswordDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    token: string;
}
