import { City } from '../../../../../state/entities/filters/filters.interface';
import { INewPostPayload, IPost } from '../../../../../state/entities/posts/posts.interface';

export const normalizePostData = (data: IPost): INewPostPayload => ({
    residentsAmount: data.residentsAmount,
    children: data.children,
    pets: data.pets,
    houseTypeFilters: data.houseTypeFilters,
    roomFilters: data.roomFilters,
    priceFilters: data.priceFilters,
    cityFilters: data.cityFilters as City,
    districtFilters: data.districtFilters,
    title: data.title,
    description: data.description,
    image: data.image,
});
