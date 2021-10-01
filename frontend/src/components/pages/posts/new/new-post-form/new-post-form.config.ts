import { SelectList, SelectValue } from '../../../../../interfaces';

export const rooms: string[] = ['one', 'two', 'three', 'four', 'more'];

export const houseType: string[] = ['new', 'old'];

export const price: string[] = ['price_one', 'price_two', 'price_three', 'price_four', 'price_five', 'price_six', 'price_seven'];

export const residentsAmount: SelectList = [
    { id: '1', value: '1' },
    { id: '2', value: '2' },
    { id: '3', value: '3' },
    { id: '4', value: '4' },
    { id: '5', value: '5' },
    { id: '6', value: '6' },
    { id: '7', value: '7' },
    { id: '8', value: '8' },
    { id: '9', value: '9' },
    { id: '10', value: '10' },
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
