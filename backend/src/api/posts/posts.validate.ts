import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

import { PostEntity } from './entities/posts.entity';
import { KYIV_DISTRICT_FILTERS, LVIV_DISTRICT_FILTERS } from './posts.interface';

const enumMap = {
    kyiv: KYIV_DISTRICT_FILTERS,
    lviv: LVIV_DISTRICT_FILTERS,
};

@ValidatorConstraint({ name: 'district', async: false })
export class DistrictValidator implements ValidatorConstraintInterface {
    validate(district: string[], args: ValidationArguments): boolean {
        const city = (args.object as PostEntity).cityFilters || 'kyiv';
        const districts = Object.values(enumMap[city]);
        return district?.every(item => districts.includes(item));
    }

    defaultMessage(): string {
        return 'invalid district values';
    }
}
