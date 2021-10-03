import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import {
    City,
    DISTRICT_FILTERS,
    GENERAL_FILTERS,
    HOUSE_TYPE_FILTERS,
    KYIV_DISTRICT_FILTERS,
    LVIV_DISTRICT_FILTERS,
    POST_STATUS,
    PRICE_FILTERS,
    ROOM_FILTERS,
} from './posts.interface';
import { Post } from './posts.entity';
import { SearchPostDto } from './dto/search.dto';

const enumMap = {
    kyiv: KYIV_DISTRICT_FILTERS,
    lviv: LVIV_DISTRICT_FILTERS,
};

@ValidatorConstraint({ name: 'district', async: false })
export class DistrictValidator implements ValidatorConstraintInterface {
    validate(district: string[], args: ValidationArguments): boolean {
        const city = (args.object as Post).cityFilters || 'kyiv';
        const districts = Object.values(enumMap[city]);
        return district?.every(item => districts.includes(item));
    }

    defaultMessage(): string {
        return 'invalid district values';
    }
}

export const getSearchFilters = (query: { [key: string]: unknown }): SearchPostDto => {
    const searchFilters = new SearchPostDto();

    if (query.query) {
        searchFilters.query = query.query as string;
    }

    if (typeof query.status === 'string') {
        searchFilters.status = query.status.split(',') as POST_STATUS[];
    }

    if (typeof query.general === 'string') {
        searchFilters.general = query.general.split(',') as GENERAL_FILTERS[];
    }

    if (typeof query.room === 'string') {
        searchFilters.room = query.room.split(',') as ROOM_FILTERS[];
    }

    if (typeof query.houseType === 'string') {
        searchFilters.houseType = query.houseType.split(',') as HOUSE_TYPE_FILTERS[];
    }

    if (typeof query.price === 'string') {
        searchFilters.price = query.price.split(',') as PRICE_FILTERS[];
    }

    if (typeof query.city === 'string') {
        searchFilters.city = query.city as City;
    }

    if (typeof query.district === 'string') {
        searchFilters.district = query.district.split(',') as DISTRICT_FILTERS[];
    }

    return searchFilters;
};
