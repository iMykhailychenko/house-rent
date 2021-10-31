import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

import { POST_STATUS } from '../posts.interface';

export class PersonalPostDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(POST_STATUS)
    status: POST_STATUS = POST_STATUS.DRAFT;

    @IsInt()
    @IsOptional()
    @Min(0)
    page = 1;

    @IsInt()
    @IsOptional()
    @Min(0)
    limit = 20;
}
