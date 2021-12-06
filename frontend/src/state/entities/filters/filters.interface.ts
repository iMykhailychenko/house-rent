import { IChipsMap } from '../../../interfaces';

export type City = 'kyiv' | 'lviv';

export enum SEARCH_FILTERS {
    QUERY = 'query',
    GENERAL = 'general',
    ROOM = 'room',
    HOUSE_TYPE = 'house_type',
    PRICE = 'price',
    CITY = 'city',
    DISTRICT = 'district',
}

export enum USER_POSTS_FILTERS {
    STATUS = 'status',
}

export type IFiltersState = {
    [SEARCH_FILTERS.QUERY]: string;
    [SEARCH_FILTERS.GENERAL]: IChipsMap;
    [SEARCH_FILTERS.PRICE]: IChipsMap;
    [SEARCH_FILTERS.HOUSE_TYPE]: IChipsMap;
    [SEARCH_FILTERS.ROOM]: IChipsMap;
    [SEARCH_FILTERS.CITY]: City;
    [SEARCH_FILTERS.DISTRICT]: IChipsMap;
    [USER_POSTS_FILTERS.STATUS]: IChipsMap;
};

export enum RESIDENTS_AMOUNT {
    ONE = 'one_resident',
    TWO = 'two_resident',
    THREE = 'three_resident',
    FOUR = 'four_resident',
    FIVE = 'five_resident',
    SIX = 'six_resident',
    MORE = 'more_resident',
}
