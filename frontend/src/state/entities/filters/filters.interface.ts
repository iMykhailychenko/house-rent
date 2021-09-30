import { IChipsMap } from '../../../interfaces';

export enum SEARCH_FILTERS {
    INPUT = 'input',
    GENERAL = 'general',
    ROOM = 'room',
    HOUSE_TYPE = 'house_type',
    PRICE = 'price',
    CITY = 'city',
    DISTRICT = 'district',
}

export type City = 'kyiv' | 'lviv';

export type IFiltersState = {
    [SEARCH_FILTERS.INPUT]: string;
    [SEARCH_FILTERS.GENERAL]: IChipsMap;
    [SEARCH_FILTERS.PRICE]: IChipsMap;
    [SEARCH_FILTERS.HOUSE_TYPE]: IChipsMap;
    [SEARCH_FILTERS.ROOM]: IChipsMap;
    [SEARCH_FILTERS.CITY]: City;
    [SEARCH_FILTERS.DISTRICT]: IChipsMap;
};
