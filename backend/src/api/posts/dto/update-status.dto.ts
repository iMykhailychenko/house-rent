import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';

import { POST_STATUS } from '../../../interfaces/posts.interface';

export class StatusDto {
    @IsArray()
    @IsNotEmpty()
    @IsEnum(POST_STATUS, { each: true })
    status: POST_STATUS[] = [POST_STATUS.IDLE];
}
