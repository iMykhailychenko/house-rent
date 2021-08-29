import { ThunkStatuses } from '../../interfaces';
import { City } from '../filters/filters.interface';

export interface INewPostPayload {
    title: string;
    description: string;
    house_type: string[];
    rooms: string[];
    price: string[];
    city: City;
    district: string[];
}

export interface INewPostState {
    postStatus: ThunkStatuses;
    imgStatus: ThunkStatuses;
    error: string | null;
}

export interface IPostState {
    new: INewPostState;
}
