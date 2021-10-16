import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
    @IsNotEmpty()
    @IsInt()
    customer: number;

    @IsNotEmpty()
    @IsInt()
    realtor: number;
}
