import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, Validate } from 'class-validator';

import { City, DISTRICT_FILTERS, HOUSE_TYPE_FILTERS, PRICE_FILTERS, RESIDENTS_AMOUNT, ROOM_FILTERS } from '../posts.interface';
import { DistrictValidator } from '../posts.validate';

export class UpdatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    @IsOptional()
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(RESIDENTS_AMOUNT)
    @IsOptional()
    residentsAmount: RESIDENTS_AMOUNT;

    @IsString()
    @IsOptional()
    @IsOptional()
    children: string;

    @IsString()
    @IsOptional()
    @IsOptional()
    pets: string;

    @IsString()
    @IsOptional()
    @IsOptional()
    image: string;

    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    @IsEnum(ROOM_FILTERS, { each: true })
    roomFilters: ROOM_FILTERS[];

    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    @IsEnum(HOUSE_TYPE_FILTERS, { each: true })
    houseTypeFilters: HOUSE_TYPE_FILTERS[];

    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    @IsEnum(PRICE_FILTERS, { each: true })
    priceFilters: PRICE_FILTERS[];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    cityFilters: City;

    @IsArray()
    @IsNotEmpty()
    @Validate(DistrictValidator)
    @IsOptional()
    districtFilters: DISTRICT_FILTERS[];
}
