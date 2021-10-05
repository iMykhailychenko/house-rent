import { IStepOne, IStepTwo } from '../../../../../state/entities/posts/posts.interface';

interface NormalizedFilters {
    room: string;
    houseType: string;
    city: string;
    price: string;
    district: string;
}

const normalizeFilters = (data: IStepOne & IStepTwo): NormalizedFilters => {
    return {
        room: data.roomFilters[0],
        houseType: data.houseTypeFilters[0],
        city: data.cityFilters,
        price: data.priceFilters[0],
        district: data.districtFilters[0],
    };
};

const replacer = (value: string, data: NormalizedFilters): string =>
    value
        .replace(/\$room/i, data.room)
        .replace(/\$houseType/i, data.houseType)
        .replace(/\$city/i, data.city)
        .replace(/\$price/i, data.price)
        .replace(/\$district/i, data.district);

export const getTitleTemplate = (data: IStepOne & IStepTwo, index = 0): string => {
    const templates = ['Шукаю затишну $room кімнатну квартиру в $houseType. Бюджет: $city. $price, район: $district'];
    return templates[index];
};

export const getDescriptionTemplate = (data: IStepOne & IStepTwo, index = 1): string => {
    return 'Шукаю затишну 2-x кімнатну квартиру в новобудові, бюджет: 10-15к грн';
};
