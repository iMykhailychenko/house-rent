import { IFiltersState, SEARCH_FILTERS } from '../../state/entities/filters/filters.interface';

type FiltersToArrayType = { [key: string]: string[] | string | null };
export const searchFiltersToArray = (filters: IFiltersState): FiltersToArrayType => {
    const general = Object.values(filters[SEARCH_FILTERS.GENERAL]).reduce<string[]>((acc, filter) => {
        if (filter.active) acc.push(filter.name);
        return acc;
    }, []);

    const price = Object.values(filters[SEARCH_FILTERS.PRICE]).reduce<string[]>((acc, filter) => {
        if (filter.active) acc.push(filter.name);
        return acc;
    }, []);

    const houseType = Object.values(filters[SEARCH_FILTERS.HOUSE_TYPE]).reduce<string[]>((acc, filter) => {
        if (filter.active) acc.push(filter.name);
        return acc;
    }, []);

    const room = Object.values(filters[SEARCH_FILTERS.ROOM]).reduce<string[]>((acc, filter) => {
        if (filter.active) acc.push(filter.name);
        return acc;
    }, []);

    const dispatch = Object.values(filters[SEARCH_FILTERS.DISTRICT]).reduce<string[]>((acc, filter) => {
        if (filter.active) acc.push(filter.name);
        return acc;
    }, []);

    return {
        [SEARCH_FILTERS.CITY]: filters[SEARCH_FILTERS.CITY],
        [SEARCH_FILTERS.QUERY]: filters[SEARCH_FILTERS.QUERY] || null,
        [SEARCH_FILTERS.GENERAL]: general.length ? general : null,
        [SEARCH_FILTERS.PRICE]: price.length ? price : null,
        [SEARCH_FILTERS.HOUSE_TYPE]: houseType.length ? houseType : null,
        [SEARCH_FILTERS.ROOM]: room.length ? room : null,
        [SEARCH_FILTERS.DISTRICT]: dispatch.length ? dispatch : null,
    };
};
