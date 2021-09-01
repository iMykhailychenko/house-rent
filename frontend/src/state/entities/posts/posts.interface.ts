import { ThunkStatuses } from '../../interfaces';
import { City } from '../filters/filters.interface';

export interface INewPostPayload {
    title: string;
    description: string;
    houseTypeFilters: string[];
    roomFilters: string[];
    priceFilters: string[];
    cityFilters: City;
    districtFilters: string[];
}

export interface INewPostState {
    postStatus: ThunkStatuses;
    imgStatus: ThunkStatuses;
    error: string | null;
}

export interface IPostState {
    new: INewPostState;
}
