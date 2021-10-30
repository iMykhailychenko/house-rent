import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MessageDto {
    @IsNotEmpty()
    @IsInt()
    author: number;

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsArray()
    @IsOptional()
    uploads: string[];

    @IsInt()
    chatId: number;
}
