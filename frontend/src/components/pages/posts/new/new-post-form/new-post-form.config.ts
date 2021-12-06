import { SelectValue } from '../../../../../interfaces';
import { RESIDENTS_AMOUNT } from '../../../../../state/entities/filters/filters.interface';

export const rooms: string[] = ['one', 'two', 'three', 'four', 'more'];

export const houseType: string[] = ['new', 'old'];

export const price: string[] = ['price_one', 'price_two', 'price_three', 'price_four', 'price_five', 'price_six', 'price_seven'];

export const residentsAmount: string[] = [
    RESIDENTS_AMOUNT.ONE,
    RESIDENTS_AMOUNT.TWO,
    RESIDENTS_AMOUNT.THREE,
    RESIDENTS_AMOUNT.FOUR,
    RESIDENTS_AMOUNT.FIVE,
    RESIDENTS_AMOUNT.SIX,
    RESIDENTS_AMOUNT.MORE,
];

export const districtKyiv: string[] = [
    'darnytsia',
    'desnianskyi',
    'dniprovskyi',
    'holosiiv',
    'obolonskyi',
    'pecherskyi',
    'podil',
    'shevchenkivskyi',
    'solomianskyi',
    'sviatoshynskyi',
];

export const districtLviv: string[] = ['halych', 'railway', 'lychakiv', 'sykhiv', 'franko', 'shevchenko'];

export const cities: SelectValue[] = [
    { id: 'kyiv', value: 'kyiv' },
    { id: 'lviv', value: 'lviv' },
];

export const formatSelectValue = (city: string): SelectValue => ({
    id: city,
    value: city,
});
