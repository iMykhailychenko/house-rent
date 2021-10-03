import { IsArray, IsEnum, IsOptional, IsString, Validate } from 'class-validator';
import {
    City,
    DISTRICT_FILTERS,
    GENERAL_FILTERS,
    HOUSE_TYPE_FILTERS,
    POST_STATUS,
    PRICE_FILTERS,
    ROOM_FILTERS,
} from '../posts.interface';
import { DistrictValidator } from '../posts.validate';

export class SearchPostDto {
    @IsString()
    @IsOptional()
    query: string;

    @IsArray()
    @IsEnum(POST_STATUS, { each: true })
    @IsOptional()
    status: POST_STATUS[];

    @IsArray()
    @IsEnum(GENERAL_FILTERS, { each: true })
    @IsOptional()
    general: GENERAL_FILTERS[];

    @IsArray()
    @IsEnum(ROOM_FILTERS, { each: true })
    @IsOptional()
    room: ROOM_FILTERS[];

    @IsArray()
    @IsEnum(HOUSE_TYPE_FILTERS, { each: true })
    @IsOptional()
    houseType: HOUSE_TYPE_FILTERS[];

    @IsArray()
    @IsEnum(PRICE_FILTERS, { each: true })
    @IsOptional()
    price: PRICE_FILTERS[];

    @IsString()
    @IsOptional()
    city: City;

    @IsArray()
    @Validate(DistrictValidator)
    @IsOptional()
    district: DISTRICT_FILTERS[];
}
