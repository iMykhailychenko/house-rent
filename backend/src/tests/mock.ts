import { HOUSE_TYPE_FILTERS, KYIV_DISTRICT_FILTERS, PRICE_FILTERS, ROOM_FILTERS } from '../api/posts/posts.interface';

export const mockNewPostBody = {
    title: 'test',
    description: 'test description',
    residentsAmount: 1,
    roomFilters: [ROOM_FILTERS.ONE, ROOM_FILTERS.TWO, ROOM_FILTERS.THREE, ROOM_FILTERS.FOUR, ROOM_FILTERS.MORE],
    houseTypeFilters: [HOUSE_TYPE_FILTERS.NEW, HOUSE_TYPE_FILTERS.OLD],
    priceFilters: [PRICE_FILTERS.PRICE_ONE, PRICE_FILTERS.PRICE_TWO, PRICE_FILTERS.PRICE_THREE, PRICE_FILTERS.PRICE_FOUR],
    cityFilters: 'kyiv',
    districtFilters: [KYIV_DISTRICT_FILTERS.DESNIANSKYI, KYIV_DISTRICT_FILTERS.DARNYTSIA, KYIV_DISTRICT_FILTERS.PODIL],
};

export const joinMock = {
    firstName: 'Name',
    lastName: 'LastName',
    email: 'test@mail.ru',
    password: 'P@ssw0rd!',
};

export const loginMock = {
    email: 'test@mail.ru',
    password: 'P@ssw0rd!',
};
