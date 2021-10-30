import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
    @IsNotEmpty()
    @IsInt()
    id: number;

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsArray()
    @IsOptional()
    uploads: string[];

    @IsInt()
    chatId: number;

    @IsNotEmpty()
    @IsInt()
    userId: number;
}
