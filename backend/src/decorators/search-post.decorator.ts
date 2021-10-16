import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import {
    City,
    DISTRICT_FILTERS,
    GENERAL_FILTERS,
    HOUSE_TYPE_FILTERS,
    PRICE_FILTERS,
    ROOM_FILTERS,
} from 'src/interfaces/posts.interface';

import { SearchPostDto } from '../api/posts/dto/search-post.dto';
import { AuthRequest } from '../interfaces/users.interface';

export const SearchPost = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<AuthRequest>();

    const searchDto = new SearchPostDto();
    searchDto.page = +req.query.page || 1;
    searchDto.limit = +req.query.limit || 1;

    if (req.query.city) searchDto.city = req.query.city as City;
    if (req.query.query) searchDto.query = req.query.query as string;

    if (req.query.room) searchDto.room = (req.query.room as string).split(',') as ROOM_FILTERS[];
    if (req.query.district) searchDto.district = (req.query.district as string).split(',') as DISTRICT_FILTERS[];
    if (req.query.house_type) searchDto.houseType = (req.query.house_type as string).split(',') as HOUSE_TYPE_FILTERS[];
    if (req.query.general) searchDto.general = (req.query.general as string).split(',') as GENERAL_FILTERS[];
    if (req.query.price) searchDto.price = (req.query.price as string).split(',') as PRICE_FILTERS[];

    const errors = await validate(searchDto);
    if (errors.length) throw new HttpException(Object.values(errors[0].constraints)[0], HttpStatus.UNPROCESSABLE_ENTITY);

    return searchDto;
});
