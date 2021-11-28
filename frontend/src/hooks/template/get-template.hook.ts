import { useCallback } from 'react';

import { TemplateDataType } from '../../components/pages/posts/new/new-post-form/new-post-form';
import useTrans from '../trans.hook';

import useNormalizeFilters from './normilize.hook';

export interface NormalizedFilters {
    user: string;
    pets: string;
    room: string;
    city: string;
    price: string;
    metro: string;
    district: string;
    children: string;
    residents: string;
    houseType: string;
}

const replacer = (value: string, data: NormalizedFilters): string =>
    value
        .replace(/\$city/i, data.city)
        .replace(/\$user/i, data.user)
        .replace(/\$room/i, data.room)
        .replace(/\$pets/i, data.pets)
        .replace(/\$price/i, data.price)
        .replace(/\$metro/i, data.metro)
        .replace(/\$children/i, data.children)
        .replace(/\$houseType/i, data.houseType)
        .replace(/\$residents/i, data.residents)
        .replace(/\$district/i, data.district);

type GetTemplate = (data: TemplateDataType, index?: number) => string;

export const useGetTitleTemplate = (): GetTemplate => {
    const trans = useTrans();
    const normalizeFilters = useNormalizeFilters();

    return useCallback(
        (data, index = 0) => {
            const normalizedFilters = normalizeFilters(data);
            const templates = [
                'title_template_1',
                'title_template_2',
                'title_template_3',
                'title_template_4',
                'title_template_5',
            ];
            return replacer(trans(templates[index]), normalizedFilters);
        },
        [normalizeFilters, trans],
    );
};

export const useGetDescriptionTemplate = (): GetTemplate => {
    const trans = useTrans();
    const normalizeFilters = useNormalizeFilters();
    return useCallback(
        (data, index = 0) => {
            const normalizedFilters = normalizeFilters(data);
            const templates = [
                'description_template_1',
                'description_template_2',
                'description_template_3',
                'description_template_4',
                'description_template_5',
            ];
            return replacer(trans(templates[index]), normalizedFilters);
        },
        [normalizeFilters, trans],
    );
};
