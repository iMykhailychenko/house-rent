import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { IChipsMap, ISearchFilters, SEARCH_FILTERS } from '../../../interfaces';
import { RootState } from '../../reducer';

export const useAllFiltersSelector = (): ISearchFilters =>
    useAppSelector<ISearchFilters>(({ filters }: RootState) => filters, shallowEqual);

export const useGeneralFiltersSelector = (): IChipsMap =>
    useAppSelector<IChipsMap>(({ filters }: RootState) => filters[SEARCH_FILTERS.GENERAL], shallowEqual);

export const useRoomFiltersSelector = (): IChipsMap =>
    useAppSelector<IChipsMap>(({ filters }: RootState) => filters[SEARCH_FILTERS.ROOM], shallowEqual);

export const usePriceFiltersSelector = (): IChipsMap =>
    useAppSelector<IChipsMap>(({ filters }: RootState) => filters[SEARCH_FILTERS.PRICE], shallowEqual);

export const useHouseTypeFiltersSelector = (): IChipsMap =>
    useAppSelector<IChipsMap>(({ filters }: RootState) => filters[SEARCH_FILTERS.HOUSE_TYPE], shallowEqual);

export const useCityFiltersSelector = (): IChipsMap =>
    useAppSelector<IChipsMap>(({ filters }: RootState) => filters[SEARCH_FILTERS.CITY], shallowEqual);
