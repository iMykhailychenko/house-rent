import { shallowEqual } from 'react-redux';

import { useAppSelector } from '../../../hooks/redux.hook';
import { IChipsMap } from '../../../interfaces';
import { RootState } from '../../reducer';

import { City, IFiltersState, SEARCH_FILTERS } from './filters.interface';

export const useAllFiltersSelector = (): IFiltersState =>
    useAppSelector<IFiltersState>(({ filters }: RootState) => filters, shallowEqual);

export const useGeneralFiltersSelector = (): IChipsMap =>
    useAppSelector<IChipsMap>(({ filters }: RootState) => filters[SEARCH_FILTERS.GENERAL], shallowEqual);

export const useRoomFiltersSelector = (): IChipsMap =>
    useAppSelector<IChipsMap>(({ filters }: RootState) => filters[SEARCH_FILTERS.ROOM], shallowEqual);

export const usePriceFiltersSelector = (): IChipsMap =>
    useAppSelector<IChipsMap>(({ filters }: RootState) => filters[SEARCH_FILTERS.PRICE], shallowEqual);

export const useHouseTypeFiltersSelector = (): IChipsMap =>
    useAppSelector<IChipsMap>(({ filters }: RootState) => filters[SEARCH_FILTERS.HOUSE_TYPE], shallowEqual);

export const useCityFiltersSelector = (): City =>
    useAppSelector<City>(({ filters }: RootState) => filters[SEARCH_FILTERS.CITY], shallowEqual);

export const useDistrictFiltersSelector = (): IChipsMap =>
    useAppSelector<IChipsMap>(({ filters }: RootState) => filters[SEARCH_FILTERS.DISTRICT], shallowEqual);
