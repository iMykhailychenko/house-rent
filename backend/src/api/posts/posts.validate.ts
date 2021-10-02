import { isEnum, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ALL_STATUSES, KYIV_DISTRICT_FILTERS, LVIV_DISTRICT_FILTERS, POST_STATUS } from './posts.interface';
import { Post } from './posts.entity';

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

export const validateStatus = (status: unknown): POST_STATUS[] => {
    if (typeof status === 'string') {
        const statusList = status.split(',');
        const hasError = !statusList.every(item => isEnum(item, POST_STATUS));
        return hasError ? ALL_STATUSES : (statusList as POST_STATUS[]);
    }

    return ALL_STATUSES;
};
