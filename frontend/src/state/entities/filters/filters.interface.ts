import { IChipsMap } from '../../../interfaces';

export enum SEARCH_FILTERS {
    GENERAL = 'general',
    ROOM = 'room',
    HOUSE_TYPE = 'house_type',
    PRICE = 'price',
    CITY = 'city',
    DISTRICT = 'district',
}

export type IFiltersState = {
    [SEARCH_FILTERS.GENERAL]: IChipsMap;
    [SEARCH_FILTERS.PRICE]: IChipsMap;
    [SEARCH_FILTERS.HOUSE_TYPE]: IChipsMap;
    [SEARCH_FILTERS.ROOM]: IChipsMap;
    [SEARCH_FILTERS.CITY]: City;
    [SEARCH_FILTERS.DISTRICT]: IChipsMap;
};

export type City = 'kyiv' | 'lviv';
