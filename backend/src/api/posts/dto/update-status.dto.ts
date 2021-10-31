import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';

import { POST_STATUS } from '../posts.interface';

export class StatusDto {
    @IsArray()
    @IsNotEmpty()
    @IsEnum(POST_STATUS)
    status: POST_STATUS = POST_STATUS.DRAFT;
}
