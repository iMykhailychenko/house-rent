import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Validate } from 'class-validator';

import { City, DISTRICT_FILTERS, HOUSE_TYPE_FILTERS, POST_STATUS, PRICE_FILTERS, ROOM_FILTERS } from '../posts.interface';
import { DistrictValidator } from '../posts.validate';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    description: string;

    @IsNumber()
    @IsNotEmpty()
    residentsAmount: number;

    @IsString()
    @IsOptional()
    children: string;

    @IsString()
    @IsOptional()
    pets: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsDate()
    createdAt: Date = new Date();

    @IsString()
    @IsNotEmpty()
    @IsEnum(POST_STATUS)
    status: POST_STATUS = POST_STATUS.DRAFT;

    @IsArray()
    @IsNotEmpty()
    @IsEnum(ROOM_FILTERS, { each: true })
    roomFilters: ROOM_FILTERS[];

    @IsArray()
    @IsNotEmpty()
    @IsEnum(HOUSE_TYPE_FILTERS, { each: true })
    houseTypeFilters: HOUSE_TYPE_FILTERS[];

    @IsArray()
    @IsNotEmpty()
    @IsEnum(PRICE_FILTERS, { each: true })
    priceFilters: PRICE_FILTERS[];

    @IsString()
    @IsNotEmpty()
    cityFilters: City;

    @IsArray()
    @IsNotEmpty()
    @Validate(DistrictValidator)
    districtFilters: DISTRICT_FILTERS[];
}
